import { expect } from 'chai';
import crypto from 'node:crypto';
import { execute, create, update, get, upsert } from '../dist/index.js';

const getRandomProgramPayload = () => {
  const name = crypto.randomBytes(16).toString('hex');
  const shortName = name.substring(0, 5);
  const programType = 'WITHOUT_REGISTRATION';
  return { name, shortName, programType };
};

const configuration = {
  username: 'admin',
  password: 'district',
  hostUrl: 'https://play.im.dhis2.org/stable-2-40-5',
};

describe('Integration tests', () => {
  const fixture = {};

  before(done => {
    fixture.initialState = {
      configuration,
      program: 'IpHINAT79UW',
      orgUnit: 'DiszpKrYNg8',
      trackedEntityInstance: 'uhubxsfLanV',
      // programStage: 'eaDHS084uMp',
      programStage: 'CWaAcQYKVpq', // new!
    };
    done();
  });

  describe('create', () => {
    it('should create an event program', async () => {
      const state = {
        ...fixture.initialState,
        data: getRandomProgramPayload(),
      };

      const finalState = await execute(create('programs', state => state.data))(
        state
      );

      expect(finalState.data.status).to.eq('OK');
    });

    it('should create a single event', async () => {
      const state = { ...fixture.initialState };

      const finalState = await execute(
        create('events', state => ({
          program: state.program,
          orgUnit: state.orgUnit,
          trackedEntityInstance: state.trackedEntityInstance,
          programStage: state.programStage,
          status: 'COMPLETED',
        }))
      )(state);

      expect(finalState.data.status).to.eq('OK');
    });

    it('should create a single tracked entity instance', async () => {
      const state = {
        ...fixture.initialState,
        data: {
          orgUnit: 'DiszpKrYNg8',
          trackedEntityType: 'nEenWmSyUEp',
          attributes: [
            {
              attribute: 'w75KJ2mc4zz',
              value: 'Gigiwe',
            },
          ],
        },
      };

      const finalState = await execute(
        create('trackedEntityInstances', state => state.data)
      )(state);

      expect(finalState.data.status).to.eq('OK');
    });

    it('should create a single dataValueSet', async () => {
      const state = {
        ...fixture.initialState,
        data: {
          dataElement: 'f7n9E0hX8qk',
          period: '201401',
          orgUnit: 'DiszpKrYNg8',
          value: '12',
        },
      };

      const finalState = await execute(
        create('dataValueSets', state => state.data)
      )(state);

      expect(finalState.data.status).to.eq('OK');
    });

    it('should create a set of related data values sharing the same period and organisation unit', async () => {
      const state = {
        ...fixture.initialState,
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

      const finalState = await execute(
        create('dataValueSets', state => state.data)
      )(state);

      expect(finalState.data.status).to.eq('OK');
    });
  });

  describe('update', () => {
    it('should update an event program', async () => {
      const state = {
        ...fixture.initialState,
        eventProgram: 'M3xtLkYBlKI',
      };

      const response = await execute(
        update(
          'programs',
          state => state.eventProgram,
          getRandomProgramPayload()
        )
      )(state);
      expect(response.data.status).to.eq('OK');
    });

    it('should update a single event', async () => {
      const state = {
        ...fixture.initialState,
        event: 'rBjxtO8npTb',
        data: {
          href: 'https://play.dhis2.org/2.36.6/api/events/rBjxtO8npTb',
          event: 'rBjxtO8npTb',
          status: 'ACTIVE',
          program: 'M3xtLkYBlKI',
          programStage: 'CWaAcQYKVpq',
          enrollment: 'V8uPJuhvlL7',
          enrollmentStatus: 'ACTIVE',
          orgUnit: 'DiszpKrYNg8',
          orgUnitName: 'Ngelehun CHC',
          trackedEntityInstance: 'dNpxRu1mWG5',
          relationships: [],
          eventDate: '2021-09-26T00:00:00.000',
          dueDate: '2021-09-27T00:00:00.000',
          storedBy: 'system',
          dataValues: [],
          notes: [],
          followup: false,
          deleted: false,
          created: '2019-09-26T23:58:59.641',
          lastUpdated: '2019-09-27T00:02:11.604',
          createdAtClient: '2019-09-26T23:58:59.641',
          lastUpdatedAtClient: '2019-09-27T00:02:11.604',
          attributeOptionCombo: 'HllvX50cXC0',
          attributeCategoryOptions: 'xYerKDKCefk',
          assignedUser: 'DXyJmlo9rge',
          assignedUserUsername: 'android',
          assignedUserDisplayName: 'Tim Barnes',
        },
      };
      const finalState = await execute(
        update(
          'events',
          state => state.event,
          state => state.data
        )
      )(state);
      expect(finalState.data.status).to.eql('OK');
    });

    it('should update a single tracked entity instance', async () => {
      const state = {
        ...fixture.initialState,
        data: {
          orgUnit: 'DiszpKrYNg8',
          trackedEntityType: 'nEenWmSyUEp',
          attributes: [
            {
              attribute: 'w75KJ2mc4zz',
              value: 'Gigiwe',
            },
          ],
        },
      };

      const finalState = await execute(
        update('trackedEntityInstances', 'bmshzEacgxa', state => state.data)
      )(state);

      expect(finalState.data.status).to.eq('OK');
    });

    it('should update a single dataSet', async () => {
      const state = {
        ...fixture.initialState,
        data: {
          name: 'Reproductive Health',
          shortName: 'Reproductive Health',
          displayFormName: 'Reproductive Health',
          displayName: 'Reproductive Health',
          periodType: 'Monthly',
          dataSetElements: [
            {
              dataElement: {
                id: 'FE82N2sA0YI',
              },
              dataSet: {
                id: 'QX4ZTUbOt3a',
              },
            },
          ],
        },
      };
      const finalState = await execute(
        update('dataSets', 'QX4ZTUbOt3a', state => state.data)
      )(state);
      expect(finalState.data.status).to.eql('OK');
    });
  });

  describe('get', () => {
    const state = {
      configuration,
      data: {},
    };

    it('should get dataValueSets matching the query specified', async () => {
      const finalState = await execute(
        get('dataValueSets', {
          dataSet: 'pBOMPrpg1QX',
          orgUnit: 'DiszpKrYNg8',
          period: '201401',
          fields: '*',
        })
      )(state);

      expect(finalState.data.dataValues.length).to.gte(1);
    });

    it('should get a single TEI based on multiple filters', async () => {
      const finalState = await execute(
        get('trackedEntityInstances', {
          program: 'IpHINAT79UW',
          ou: 'DiszpKrYNg8',
          filter: ['w75KJ2mc4zz:Eq:Sophia', 'zDhUuAYrxNC:Eq:Jackson'],
        })
      )(state);

      expect(finalState.data.trackedEntityInstances.length).to.eq(1);

      const finalState2 = await execute(
        get('trackedEntityInstances', {
          program: 'IpHINAT79UW',
          ou: 'DiszpKrYNg8',
          filter: ['w75KJ2mc4zz:Eq:Sophia', 'zDhUuAYrxNC:Eq:NotJackson'],
        })
      )(state);

      expect(finalState2.data.trackedEntityInstances.length).to.eq(0);
    }).timeout(3000);

    it('should get a no TEIs if non match the filters', async () => {
      const finalState = await execute(
        get('trackedEntityInstances', {
          program: 'IpHINAT79UW',
          ou: 'DiszpKrYNg8',
          filter: [
            'w75KJ2mc4zz:Eq:Tim',
            'flGbXLXCrEo:Eq:124-not-a-real-id', // case ID
            'zDhUuAYrxNC:Eq:Thompson',
          ],
        })
      )(state);

      expect(finalState.data.trackedEntityInstances.length).to.eq(0);
    });

    it('should get all programs in the organisation unit TSyzvBiovKh', async () => {
      const response = await execute(
        get('programs', { orgUnit: 'TSyzvBiovKh' })
      )(state);

      expect(response.data.programs.length).to.gte(1);
    });
  });

  describe('upsert', () => {
    it('should upsert a trackedEntityInstance via create as query matches no data', async () => {
      const state = {
        ...fixture.initialState,
        data: {
          orgUnit: 'DiszpKrYNg8',
          trackedEntityType: 'nEenWmSyUEp',
          attributes: [
            {
              lastUpdated: '2016-01-12T00:00:00.000',
              code: 'MMD_PER_NAM',
              displayName: 'First name',
              created: '2016-01-12T00:00:00.000',
              valueType: 'TEXT',
              attribute: 'w75KJ2mc4zz',
              value: 'John',
            },
            {
              lastUpdated: '2016-01-12T00:00:00.000',
              displayName: 'Last name',
              created: '2016-01-12T00:00:00.000',
              valueType: 'TEXT',
              attribute: 'zDhUuAYrxNC',
              value: 'Thompson',
            },
          ],
        },
      };
      const finalState = await execute(
        upsert(
          'trackedEntityInstances',
          {
            program: 'IpHINAT79UW',
            ou: 'DiszpKrYNg8',
            filter: ['w75KJ2mc4zz:Eq:John', 'zDhUuAYrxNC:Eq:Thompson'],
          },
          state => state.data
        )
      )(state);

      expect(finalState.data.httpStatus).to.eq('OK');
    });

    it('should upsert a trackedEntityInstance via update as query matches one data', async () => {
      const state = {
        ...fixture.initialState,
        data: {
          orgUnit: 'TSyzvBiovKh',
          trackedEntityType: 'nEenWmSyUEp',
          attributes: [
            {
              attribute: 'w75KJ2mc4zz',
              value: 'Qassim',
            },
          ],
        },
      };
      const finalState = await execute(
        upsert(
          'trackedEntityInstances',
          {
            program: 'IpHINAT79UW',
            ou: 'TSyzvBiovKh',
            filter: ['w75KJ2mc4zz:Eq:Qassim'],
          },
          state => state.data
        )
      )(state);

      expect(finalState.data.httpStatus).to.eq('OK');
    });

    it.skip('should fail upserting a trackedEntityInstance by throwing rangeError as query matches many data', async () => {
      const state = {
        ...fixture.initialState,
        data: {
          orgUnit: 'TSyzvBiovKh',
          trackedEntityType: 'nEenWmSyUEp',
          attributes: [
            {
              attribute: 'w75KJ2mc4zz',
              value: 'Qassim',
            },
          ],
        },
      };

      const expectThrowsAsync = async (method, errorMessage) => {
        let error = null;
        try {
          await method();
        } catch (err) {
          error = err;
        }
        expect(error).to.be.an('Error');
        if (errorMessage) {
          expect(error.message).to.equal(errorMessage);
        }
      };

      await expectThrowsAsync(
        () =>
          execute(
            upsert(
              'trackedEntityInstances',
              {
                ou: 'DiszpKrYNg8',
                filter: ['zDhUuAYrxNC:Eq:Thompson'],
              },
              state => state.data
            )
          )(state),
        'Cannot upsert on Non-unique attribute. The operation found more than one records for your request.'
      );
    });
  });
});
