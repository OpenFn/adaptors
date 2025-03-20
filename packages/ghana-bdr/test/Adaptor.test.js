import { expect } from 'chai';

import { sendBirthNotification, execute } from '../src/Adaptor.js';

describe('sendBirthNotification', () => {
  it('upload birth notification', async () => {
    const state = {
      configuration: {
        username: 'test',
        password: 'fake',
      },
      data: {
        registry_code: '',
        child: {
          first_name: 'Nana',
          middle_name: 'Nana',
          Surname: 'Kumasi',
          birth_date: '2023/10/22',
          national_id_number: '90282901892',
          place_of_delivery_code: '2',
          place_of_delivery_other: null,
          birth_type_code: '1',
          gender_code: '2',
          attendant_at_birth_code: '1',
          attendant_at_birth_other: null,
          bith_attendant_full_name: 'Dr Lawrence Kwame',
          bith_attendant_phone: '0556969609',
        },
        mother: {
          first_name: 'Nana',
          middle_name: 'Nana',
          maiden_name: 'Nana',
          surname_or_marriage_name: 'Nana',
          phone: '05673673673',
          age: 35,
          national_id_number: '90-030-003',
          nationality_code: '131',
          house_number: 'No 4536',
          street_name: 'Accra city Ghana',
          district_code: '10',
          region_code: '10',
          town_or_village: 'Ajiringanor',
          number_of_children_ever_born_alive: 5,
          born_alive_are_living: 5,
          live_birth_order: 5,
          born_alive_are_dead: 0,
          education_level_code: '6',
          education_level_other: null,
          occupation_code: '13',
          occupation_other: null,
        },
        father: {
          first_name: 'Kufor',
          middle_name: 'Kufor',
          Surname: 'Mensa',
          nationality_code: '131',
          national_id_number: '88-9292-92092',
          phone: '05673673737',
          age: 38,
          education_level_code: '13',
          occupation_code: '13',
          religion_code: '1',
          education_level_other: null,
          occupation_other: null,
          religion_other: null,
          is_gainfully_employed_code: '1',
        },
        // health_facility: {
        //   name: 'Korlebu General Hospital',
        //   house_number: 'No 4536',
        //   street_name: 'Adjiringano',
        //   town_code: '12',
        //   town_other: null,
        //   district_code: '11',
        //   region_code: '12',
        // }
        // Note that this does not actually seem to be required by BDR
        // birth_informant: {
        //   relationship_code: '2',
        //   relationship_other: null,
        //   full_name: 'Kufor Mensa',
        //   phone: '055646874',
        //   digital_address: 'No. 64 Ajiringanor',
        //   national_id_number: '993993939-0303',
        // },
      },
    };

    const finalState = await execute(
      sendBirthNotification(state => state.data)
    )(state);

    expect(Object.keys(finalState.data).length).to.eql(33);
    expect(finalState.data.birth_certificate_number).to.eql('000000-00-2024');
  });
});
