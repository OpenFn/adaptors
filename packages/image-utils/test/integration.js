import { expect } from 'chai';
import { execute, assert } from '@openfn/language-common';
import { toBuf, toBase64Str, saveBase64Image } from './helpers.js';
import { decodeBase64Image } from '../src/Utils.js';
import {
  fn,
  each,
  resize,
  combine,
  dateFns,
  compress,
  getExifData,
  embedMetadata,
} from '../src/Adaptor.js';

export const buildUserComment = (childData, photoTaken) => {
  const {
    scNumber,
    scFullLegalName,
    dateOfBirth,
    gender,
    communityCode,
    puCode,
    familyPhotoDescription,
  } = childData;

  const { month, year } = photoTaken;

  const dob = dateFns.format(new Date(dateOfBirth), "yyyy-MM-dd'T'HH:mm:ss");
  const xml = `<?xml version="1.0" encoding="utf-8"?>
  <ChildPhotoMetaData xmlns:xsi=http://www.w3.org/2001/XMLSchema-instance xmlns:xsd=http://www.w3.org/2001/XMLSchema>
  <SCFullLegalName>${scFullLegalName}</SCFullLegalName>
  <SCNumber>${scNumber}</SCNumber>
  <DateOfBirth>${dob}</DateOfBirth>
  <CommunityCode>${communityCode}</CommunityCode>
  <PUCode>${puCode}</PUCode>
  <SCGender>${gender}</SCGender>
  <Description>${familyPhotoDescription}<Description />
  <ChildDocumentType>SCI</ChildDocumentType>
  <MonthOfPictureTaken>${month}</MonthOfPictureTaken>
  <YearOfPictureTaken>${year}</YearOfPictureTaken>
  <InfoAutoPopulated>true</InfoAutoPopulated>
  <PhotoType>SCPhoto</PhotoType>
  </ChildPhotoMetaData>`;

  return xml;
};

export const getCreateDate = imgBase64 => {
  const exif = getExifData(decodeBase64Image(imgBase64));

  const [yyyy, mm, dd] = exif.DateTime.split(' ')[0].split(':');
  const month = mm;
  const year = yyyy.slice(-2);

  return { month, year };
};

export const buildImgName = (childData, photoType, photoTaken) => {
  const { puCode, scNumber } = childData;
  const { month, year } = photoTaken;
  return `${puCode}_${scNumber}_${photoType}_${year}${month}.JPG`;
};
const state = {
  data: {
    scNumber: '2836550',
    scFullLegalName: 'Elissa Maria Santos',
    dateOfBirth: '2015-07-03',
    gender: 'Female',
    communityCode: 'ASE',
    puCode: '6221',
    photos: [
      {
        photoType: 'Child',
        url: 'img-512x512.jpg',
      },
      {
        photoType: 'Family',
        url: 'img-4032x3024-gps.jpg',
      },
    ],
    familyPhotoDescription: 'Elissa with her mother Maria',
  },
};

const typeMapping = { Child: 'C', Family: 'F' };

describe('image-utils', () => {
  it('process child and family photos', async () => {
    const results = await execute(
      fn(state => {
        const { photos, ...rest } = state.data;
        state.photos = photos;
        state.childData = rest;
        state.processedImgs = [];
        return state;
      }),

      each(
        state => state.photos,
        combine(
          fn(state => {
            const img = toBase64Str(state.data.url);
            const photoTaken = getCreateDate(img);
            const photoType = typeMapping[state.data.photoType];
            const userComment = buildUserComment(state.childData, photoTaken);
            const name = buildImgName(state.childData, photoType, photoTaken);

            state.img = img;
            state.imgName = name;
            state.userComment = { UserComment: userComment };

            return state;
          }),
          resize(state => state.img, {
            width: 1200,
            height: 1600,
          }),
          assert(state => state.data.width === 1200, 'width should be 1200'),
          assert(state => state.data.height === 1600, 'height should be 1600'),
          compress(state => state.data.buffer, {
            maxBytes: 700 * 1024,
            minQuality: 20,
          }),
          embedMetadata(
            state => state.data.buffer,
            state => state.userComment,
            {
              parseAs: 'base64',
            },
          ),
          fn(state => {
            saveBase64Image(state.data.base64, state.imgName);
            const { userComment, imgName } = state;
            state.processedImgs.push({
              ...userComment,
              name: imgName,
              img: state.data.base64,
            });
            return state;
          }),
        ),
      ),
    )(state);

    expect(results.processedImgs.length).to.equal(2);
    expect(results.processedImgs[0].name).to.equal('6221_2836550_C_1211.JPG');
    expect(results.processedImgs[1].name).to.equal('6221_2836550_F_2606.JPG');
  }).timeout(1e4);
  it('UserComment is updated', async () => {
    const childPhoto = getExifData(toBuf('6221_2836550_C_1211.JPG'));
    const familyPhoto = getExifData(toBuf('6221_2836550_F_2606.JPG'));

    expect(childPhoto.UserComment).to.include(
      '<MonthOfPictureTaken>11</MonthOfPictureTaken>',
    );
    expect(childPhoto.UserComment).to.include(
      '<YearOfPictureTaken>12</YearOfPictureTaken>',
    );

    expect(familyPhoto.UserComment).to.include(
      '<MonthOfPictureTaken>06</MonthOfPictureTaken>',
    );
    expect(familyPhoto.UserComment).to.include(
      '<YearOfPictureTaken>26</YearOfPictureTaken>',
    );
  });
});
