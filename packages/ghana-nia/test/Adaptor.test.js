import { expect } from 'chai';

import { registerChild, execute } from '../src/Adaptor.js';

describe('registerChild', () => {
  it('upload to NIA for Ghana Card Number', async () => {
    const state = {
      configuration: {
        merchantKey: '123',
      },
      data: {
        babyData: {
          dateOfBirth: '2024-11-12',
          fatherName: 'kwamena Ahoi Jn',
          forenames: '',
          gender: 'MALE',
          lightwaveETrackerID: 'IJggqTs7hxL',
          motherName: 'Ama Yaboah',
          noSiblingsInDelivery: '1',
          placeOfBirth: 'Accra',
          surname: 'Yaboah',
          timeOfbirth: '10:25am',
          weightAtBirth: '3kg',
          birthCertificateNumber: '2323423423',
          babyPicture: 'iVBORw0KGgoAAAANSUh...',
        },
        personVouching: {
          etrackerLightwaveID: 'IJggqTs7hxL',
          ghanaCardPIN: 'GHS-236723623-7',
          relationToBaby: 'Mother',
          relativePhone: '026252672',
          relativePicture: 'iVBORw0KGgoAAAA...',
        },
      },
    };

    const finalState = await execute(registerChild(state => state.data))(state);

    expect(finalState.data).to.deep.equal({
      data: {
        babyPin: 'GHA-000000000-1',
        voucherPin: 'GHA-000000000-4',
        etrackerLightwaveId: '00000000/24-03',
        lightwaveEtrackerId: null,
      },
      success: true,
      code: '00',
      msg: 'Saved Successfully',
    });
  });
});
