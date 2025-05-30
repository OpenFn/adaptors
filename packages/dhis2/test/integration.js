import { expect } from 'chai';
import crypto from 'node:crypto';
import { execute, create, update, upsert, get } from '../dist/index.js';

const getRandomProgramPayload = () => {
  const name = crypto.randomBytes(16).toString('hex');
  const shortName = name.substring(0, 5);
  const programType = 'WITHOUT_REGISTRATION';
  return { name, shortName, programType };
};

const configuration = {
  username: 'admin',
  password: 'district',
  // If these tests are failing, check that this URL is correct!
  hostUrl: 'https://play.im.dhis2.org/stable-2-40-7-1',
  apiVersion: '42',
};

// These values may need to be updated when switching test servers
const STARTING_ORG_UNIT = 'TSyzvBiovKh';
const STARTING_PROGRAM_STAGE = 'EPEcjy3FWmI';

describe('Integration tests', () => {
  const fixture = {};

  before(async () => {
    const state = {
      configuration,
    };

    try {
      const enrollments = get('tracker/enrollments', {
        orgUnit: STARTING_ORG_UNIT,
      });

      const enrollmentData = await execute(enrollments)(state);

      const enrollment = enrollmentData.data.instances[0];
      fixture.initialState = {
        configuration,
        program: enrollment.program,
        orgUnit: enrollment.orgUnit,
        programStage: STARTING_PROGRAM_STAGE,
        enrollment: enrollment.enrollment,
        trackedEntity: enrollment.trackedEntity,
      };
    } catch (error) {
      console.error('Error in before hook:', error);
      throw error;
    }
  });

  describe('create', () => {
    it('should create an event program', async () => {
      const state = {
        ...fixture.initialState,
        data: getRandomProgramPayload(),
      };

      const finalState = await execute(
        create('programs', state => state.data, {
          atomicMode: 'OBJECT',
        })
      )(state);

      expect(finalState.data.status).to.eq('OK');
    });

    it('should create a single event', async () => {
      6;
      const state = { ...fixture.initialState };

      const finalState = await execute(
        create(
          'events',
          state => ({
            program: state.program,
            orgUnit: state.orgUnit,
            trackedEntity: state.trackedEntity,
            programStage: state.programStage,
            enrollment: state.enrollment,
            occurredAt: '2026-01-02T12:05:00.000',
            status: 'COMPLETED',
          }),
          {
            atomicMode: 'OBJECT',
          }
        )
      )(state);

      expect(finalState.data.status).to.eq('OK');
    });

    it('should create a single tracked entity instance', async () => {
      const state = {
        ...fixture.initialState,
        data: {
          orgUnit: fixture.initialState.orgUnit,
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
        create('trackedEntityInstances', state => state.data, {
          atomicMode: 'OBJECT',
        })
      )(state);

      expect(finalState.data.status).to.eq('OK');
    });

    it('should create a single dataValueSet', async () => {
      const state = {
        ...fixture.initialState,
        data: {
          dataElement: 'f7n9E0hX8qk',
          period: '201401',
          orgUnit: fixture.initialState.orgUnit,
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
          orgUnit: fixture.initialState.orgUnit,
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
          href: 'https://play.dhis2.org/stable-2-40-7/api/events/rBjxtO8npTb',
          status: 'ACTIVE',
          event: 'NPf66VBbSdF',
          program: fixture.initialState.program,
          programStage: fixture.initialState.programStage,
          enrollment: fixture.initialState.enrollment,
          enrollmentStatus: 'ACTIVE',
          orgUnit: fixture.initialState.orgUnit,
          trackedEntityInstance: 'dNpxRu1mWG5',
          orgUnitName: 'Gerehun CHC',
          occurredAt: '2026-01-02T12:05:00.000',
          followup: false,
          deleted: false,
          createdAt: '2025-05-29T11:00:28.801',
          updatedAt: '2025-05-29T11:00:28.801',
          attributeOptionCombo: 'HllvX50cXC0',
          attributeCategoryOptions: 'xYerKDKCefk',
          completedBy: 'admin',
          completedAt: '2025-05-29T11:00:28.801',
          assignedUser: {},
          createdBy: {
            uid: 'xE7jOejl9FI',
            username: 'admin',
            firstName: 'John',
            surname: 'Traore',
          },
        },
      };
      const finalState = await execute(
        update('events', '', state => state.data)
      )(state);
      expect(finalState.data.status).to.eql('OK');
    });

    it('should update a single tracked entity instance', async () => {
      const state = {
        ...fixture.initialState,
        data: {
          orgUnit: fixture.initialState.orgUnit,
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
    it('should get dataValueSets matching the query specified', async () => {
      const state = {
        ...fixture.initialState,
        configuration,
        data: {},
      };
      const finalState = await execute(
        get('dataValueSets', {
          dataSet: 'pBOMPrpg1QX',
          orgUnit: state.orgUnit,
          period: '201401',
          fields: '*',
        })
      )(state);

      expect(finalState.data.dataValues.length).to.gte(1);
    });

    it('should get a single TEI based on multiple filters', async () => {
      const state = {
        ...fixture.initialState,
        configuration,
        data: {},
      };
      const finalState = await execute(
        get('tracker/trackedEntities', {
          program: state.program,
          orgUnit: state.orgUnit,
          filter: ['w75KJ2mc4zz:Eq:Sarama'],
        })
      )(state);

      expect(finalState.data.instances.length).to.eq(2);

      const finalState2 = await execute(
        get('trackedEntityInstances', {
          program: state.program,
          ou: state.orgUnit,
          filter: ['w75KJ2mc4zz:Eq:NotSarama', 'zDhUuAYrxNC:Eq:NotJackson'],
        })
      )(state);

      expect(finalState2.data.trackedEntityInstances.length).to.eq(0);
    }).timeout(3000);

    it('should get a no TEIs if non match the filters', async () => {
      const state = {
        ...fixture.initialState,
        configuration,
        data: {},
      };
      const finalState = await execute(
        get('trackedEntityInstances', {
          program: state.program,
          ou: state.orgUnit,
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
      const state = {
        ...fixture.initialState,
        configuration,
        data: {},
      };
      const response = await execute(
        get('programs', { orgUnit: state.orgUnit })
      )(state);

      expect(response.data.programs.length).to.gte(1);
    });
  });

  describe('upsert', () => {
    it('should upsert a trackedEntityInstance via create as query matches no data', async () => {
      const state = {
        ...fixture.initialState,
        data: {
          orgUnit: fixture.initialState.orgUnit,
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
            program: state.program,
            ou: state.orgUnit,
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
          orgUnit: fixture.initialState.orgUnit,
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
            program: state.program,
            ou: state.orgUnit,
            filter: ['w75KJ2mc4zz:Eq:Qassim'],
          },
          state => state.data
        )
      )(state);

      expect(finalState.data.httpStatus).to.eq('OK');
    });

    it('should fail upserting a trackedEntityInstance by throwing rangeError as query matches many data', async () => {
      const state = {
        ...fixture.initialState,
        data: {
          orgUnit: fixture.initialState.orgUnit,
          trackedEntityType: 'nEenWmSyUEp',
          attributes: [
            {
              attribute: 'w75KJ2mc4zz',
              value: 'Mebrahtu',
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
                program: state.program,
                ou: state.orgUnit,
                filter: ['w75KJ2mc4zz:Eq:Luwam'],
              },
              state => state.data
            )
          )(state),
        '409: Upsert failed: Multiple records found for a non-unique attribute.'
      );
    });
  });
});
