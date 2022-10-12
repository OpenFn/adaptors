const demoVersion = '2.35';
const apiVersion = '35';

const fixtures = {
  event: {
    requestBody: {
      program: 'eBAyeGv0exc',
      orgUnit: 'DiszpKrYNg8',
      eventDate: '2013-05-17',
      status: 'COMPLETED',
      storedBy: 'admin',
      coordinate: {
        latitude: '59.8',
        longitude: '10.9',
      },
      dataValues: [
        { dataElement: 'qrur9Dvnyt5', value: '99' },
        { dataElement: 'oZg33kd9taw', value: 'Female' },
        { dataElement: 'msodh3rEMJa', value: '2013-05-18' },
      ],
    },
    responseBody: {
      httpStatus: 'OK',
      httpStatusCode: 200,
      status: 'OK',
      message: 'Import was successful.',
      response: {
        responseType: 'ImportSummaries',
        imported: 3,
        updated: 0,
        deleted: 0,
        ignored: 0,
        importSummaries: [
          {
            responseType: 'ImportSummary',
            status: 'SUCCESS',
            importCount: { imported: 3, updated: 0, ignored: 0, deleted: 0 },
            reference: 'rrPOYH80oqG',
            href: 'https://play.dhis2.org/demo/api/events/rrPOYH80oqG',
          },
        ],
      },
    },
  },
};

function rand(n) {
  if (n === 0) return '';
  let r = Math.floor(Math.random() * Math.floor(n));
  return '' + r + rand(n - 1);
}

let valUpsert = rand(7);
let valUpsertTEI = rand(7);
let valDelTEI = rand(7);

export const upsertNewState = {
  configuration: {
    username: 'admin',
    password: 'district',
    hostUrl: `https://play.dhis2.org/${demoVersion}`,
    apiVersion,
  },
  data: {
    orgUnit: 'TSyzvBiovKh',
    trackedEntityType: 'nEenWmSyUEp',
    attributes: [
      {
        attribute: 'lZGmxYbs97q',
        value: valUpsert,
      },
      {
        attribute: 'w75KJ2mc4zz',
        value: 'Gigiwe',
      },
      {
        attribute: 'zDhUuAYrxNC',
        value: 'Mwanza',
      },
    ],
    enrollments: [
      {
        orgUnit: 'TSyzvBiovKh',
        program: 'fDd25txQckK',
        programState: 'lST1OZ5BDJ2',
        enrollmentDate: '2021-01-04',
        incidentDate: '2021-01-04',
      },
    ],
  },
};
export const upsertExistingState = {
  configuration: {
    username: 'admin',
    password: 'district',
    hostUrl: `https://play.dhis2.org/${demoVersion}`,
    apiVersion,
  },
  data: {
    orgUnit: 'TSyzvBiovKh',
    trackedEntityType: 'nEenWmSyUEp',
    attributes: [
      {
        attribute: 'lZGmxYbs97q',
        value: rand(7),
      },
      {
        attribute: 'w75KJ2mc4zz',
        value: 'Gigiwe',
      },
      {
        attribute: 'zDhUuAYrxNC',
        value: 'Mwanza',
      },
    ],
    enrollments: [
      {
        orgUnit: 'TSyzvBiovKh',
        program: 'fDd25txQckK',
        programState: 'lST1OZ5BDJ2',
        enrollmentDate: '2021-01-04',
        incidentDate: '2021-01-04',
      },
    ],
  },
};
export const upsertNewTEIState = {
  configuration: {
    username: 'admin',
    password: 'district',
    hostUrl: `https://play.dhis2.org/${demoVersion}`,
    apiVersion,
  },
  data: {
    orgUnit: 'TSyzvBiovKh',
    trackedEntityType: 'nEenWmSyUEp',
    attributes: [
      {
        attribute: 'lZGmxYbs97q',
        value: valUpsertTEI,
      },
      {
        attribute: 'w75KJ2mc4zz',
        value: 'Gigiwe',
      },
      {
        attribute: 'zDhUuAYrxNC',
        value: 'Mwanza',
      },
    ],
    enrollments: [
      {
        orgUnit: 'TSyzvBiovKh',
        program: 'fDd25txQckK',
        programState: 'lST1OZ5BDJ2',
        enrollmentDate: '2021-01-04',
        incidentDate: '2021-01-04',
      },
    ],
  },
};
export const upsertExistingTEIState = {
  configuration: {
    username: 'admin',
    password: 'district',
    hostUrl: `https://play.dhis2.org/${demoVersion}`,
    apiVersion,
  },
  data: {
    orgUnit: 'TSyzvBiovKh',
    trackedEntityType: 'nEenWmSyUEp',
    attributes: [
      {
        attribute: 'lZGmxYbs97q',
        value: '4088389',
      },
      {
        attribute: 'w75KJ2mc4zz',
        value: 'Gigiwe',
      },
      {
        attribute: 'zDhUuAYrxNC',
        value: 'Mwanza',
      },
    ],
    enrollments: [
      {
        orgUnit: 'TSyzvBiovKh',
        program: 'fDd25txQckK',
        programState: 'lST1OZ5BDJ2',
        enrollmentDate: '2021-01-04',
        incidentDate: '2021-01-04',
      },
    ],
  },
};

let date = new Date();
function paddZeroes(number) {
  return number <= 9 ? `0${number}` : number;
}
date =
  date.getFullYear() +
  '-' +
  paddZeroes(date.getMonth() + 1) +
  '-' +
  paddZeroes(date.getDate());
export const createEventsState = {
  configuration: {
    username: 'admin',
    password: 'district',
    hostUrl: `https://play.dhis2.org/${demoVersion}`,
    apiVersion,
  },
  data: {
    program: 'eBAyeGv0exc',
    orgUnit: 'DiszpKrYNg8',
    eventDate: date,
    status: 'COMPLETED',
    completedDate: date,
    storedBy: 'admin',
    coordinate: {
      latitude: 59.8,
      longitude: 10.9,
    },
    dataValues: [
      {
        dataElement: 'qrur9Dvnyt5',
        value: '33',
      },
      {
        dataElement: 'oZg33kd9taw',
        value: 'Male',
      },
      {
        dataElement: 'msodh3rEMJa',
        value: date,
      },
    ],
  },
};

export const sendDataForMultipleEventsState = {
  configuration: {
    username: 'admin',
    password: 'district',
    hostUrl: `https://play.dhis2.org/${demoVersion}`,
    apiVersion,
  },
  data: {
    events: [
      {
        program: 'eBAyeGv0exc',
        orgUnit: 'DiszpKrYNg8',
        eventDate: date,
        status: 'COMPLETED',
        storedBy: 'admin',
        coordinate: {
          latitude: '59.8',
          longitude: '10.9',
        },
        dataValues: [
          {
            dataElement: 'qrur9Dvnyt5',
            value: '22',
          },
          {
            dataElement: 'oZg33kd9taw',
            value: 'Male',
          },
        ],
      },
      {
        program: 'eBAyeGv0exc',
        orgUnit: 'DiszpKrYNg8',
        eventDate: date,
        status: 'COMPLETED',
        storedBy: 'admin',
        coordinate: {
          latitude: '59.8',
          longitude: '10.9',
        },
        dataValues: [
          {
            dataElement: 'qrur9Dvnyt5',
            value: '26',
          },
          {
            dataElement: 'oZg33kd9taw',
            value: 'Female',
          },
        ],
      },
    ],
  },
};

export const createState = {
  configuration: {
    username: 'admin',
    password: 'district',
    hostUrl: `https://play.dhis2.org/${demoVersion}`,
    apiVersion,
  },
  data: {
    program: 'eBAyeGv0exc',
    orgUnit: 'DiszpKrYNg8',
    eventDate: '2021-01-05',
    status: 'COMPLETED',
    completedDate: '2021-01-05',
    storedBy: 'admin',
    coordinate: {
      latitude: 59.8,
      longitude: 10.9,
    },
    dataValues: [
      {
        dataElement: 'qrur9Dvnyt5',
        value: '33',
      },
      {
        dataElement: 'oZg33kd9taw',
        value: 'Male',
      },
      {
        dataElement: 'msodh3rEMJa',
        value: '2014-05-18',
      },
    ],
  },
};

export const createBulkUnrelatedDataValues = {
  configuration: {
    username: 'admin',
    password: 'district',
    hostUrl: `https://play.dhis2.org/${demoVersion}`,
    apiVersion,
  },
  data: {
    dataValues: [
      {
        dataElement: 'f7n9E0hX8qk',
        period: '201401',
        orgUnit: 'DiszpKrYNg8',
        value: '12',
      },
      {
        dataElement: 'f7n9E0hX8qk',
        period: '201401',
        orgUnit: 'FNnj3jKGS7i',
        value: '14',
      },
      {
        dataElement: 'f7n9E0hX8qk',
        period: '201402',
        orgUnit: 'DiszpKrYNg8',
        value: '16',
      },
      {
        dataElement: 'f7n9E0hX8qk',
        period: '201402',
        orgUnit: 'Jkhdsf8sdf4',
        value: '18',
      },
    ],
  },
};

export const createRelatedDataValues = {
  configuration: {
    username: 'admin',
    password: 'district',
    hostUrl: `https://play.dhis2.org/${demoVersion}`,
    apiVersion,
  },
  data: {
    dataSet: 'pBOMPrpg1QX',
    completeDate: '2014-02-03',
    period: '201401',
    orgUnit: 'DiszpKrYNg8',
    dataValues: [
      {
        dataElement: 'f7n9E0hX8qk',
        value: '1',
      },
      {
        dataElement: 'Ix2HsbDMLea',
        value: '2',
      },
      {
        dataElement: 'eY5ehpbEsB7',
        value: '3',
      },
    ],
  },
};

export const updateState = {
  configuration: {
    username: 'admin',
    password: 'district',
    hostUrl: `https://play.dhis2.org/${demoVersion}`,
    apiVersion,
  },
  data: {
    id: 'FTRrcoaog83',
    aggregationType: 'SUM',
    domainType: 'AGGREGATE',
    valueType: 'NUMBER',
    name: 'Some New Name' + Date.now(),
    shortName: 'Accute Flaccid Paral (Deaths < 5 yrs)',
  },
};

export const patchState = {
  configuration: {
    username: 'admin',
    password: 'district',
    hostUrl: `https://play.dhis2.org/${demoVersion}`,
    apiVersion,
  },
  data: {
    name: 'Patched Name ' + Date.now(),
  },
};

export const delState = {
  configuration: {
    username: 'admin',
    password: 'district',
    hostUrl: `https://play.dhis2.org/${demoVersion}`,
    apiVersion,
  },
  data: {
    orgUnit: 'TSyzvBiovKh',
    trackedEntityType: 'nEenWmSyUEp',
    attributes: [
      {
        attribute: 'lZGmxYbs97q',
        value: valDelTEI,
      },
      {
        attribute: 'w75KJ2mc4zz',
        value: 'Gigiwe',
      },
      {
        attribute: 'zDhUuAYrxNC',
        value: 'Mwanza',
      },
    ],
    enrollments: [
      {
        orgUnit: 'TSyzvBiovKh',
        program: 'fDd25txQckK',
        programState: 'lST1OZ5BDJ2',
        enrollmentDate: '2021-01-04',
        incidentDate: '2021-01-04',
      },
    ],
  },
};

export const getState = {
  configuration: {
    username: 'admin',
    password: 'district',
    hostUrl: `https://play.dhis2.org/${demoVersion}`,
    apiVersion,
  },
};

export const enrollTEIState = {
  configuration: {
    username: 'admin',
    password: 'district',
    hostUrl: `https://play.dhis2.org/${demoVersion}`,
    apiVersion,
  },
  data: {
    orgUnit: 'TSyzvBiovKh',
    trackedEntityType: 'nEenWmSyUEp',
    attributes: [
      {
        attribute: 'lZGmxYbs97q',
        value: rand(7),
      },
      {
        attribute: 'w75KJ2mc4zz',
        value: 'Gigiwe',
      },
      {
        attribute: 'zDhUuAYrxNC',
        value: 'Mwanza',
      },
    ],
  },
};

export { fixtures, demoVersion };

export default [
  {
    pattern: 'https://play.dhis2.org/demo(.*)',

    fixtures(match, params, headers) {
      if (match[1] === '/api/events') {
        return {
          body: fixtures.event.responseBody,
          params,
          headers,
        };
      }

      throw new Error(
        `No Fixture Match\ngot: ${JSON.stringify(match, 2, null)}`
      );
    },

    post(match, data) {
      return { ok: true, match, ...data };
    },
  },
];
