import { expect } from 'chai';
import {
  combine,
  create,
  execute,
  each,
  field,
  fields,
  join,
  map,
  reference,
  source,
  sourceValue,
  steps,
} from '../src/Adaptor';

import pkg from 'lodash-fp';
const { filter, last } = pkg;

import testData from './nestedTestData' assert { type: 'json' };

describe('Composition Examples', () => {
  let initialState;
  let afterExecutionOf;

  function executionWrapper(initialState) {
    return operations => {
      return execute(operations)(initialState);
    };
  }

  beforeEach(() => {
    initialState = { data: testData, references: [] };
    afterExecutionOf = executionWrapper(initialState);
  });

  it('traverses a deeply nested structure', done => {
    const operations = steps(
      each(
        '$.data.data[*].rpt_boats[*]',
        combine(
          create(
            'Boat',
            fields(
              field('fisher_name', sourceValue('$.data.fisher_name')),
              field(
                'boat_owner_manual',
                sourceValue('$.data.boat_owner_manual')
              )
            )
          ),
          each(
            join('$.data.rpt_catch[*]', '$.references.[0].id', 'id'),
            combine(
              create(
                'Catch',
                fields(
                  field(
                    'selected_specie_label',
                    sourceValue('$.data.selected_specie_label')
                  ),
                  field('BoatID', sourceValue('$.data.id'))
                )
              ),
              each(
                '$.data.rpt_sample[*]',
                create(
                  'Sample',
                  fields(field('length', sourceValue('$.sample_length')))
                )
              )
            )
          )
        )
      )
    );

    afterExecutionOf(operations)
      .then(state => {
        let references = state.references.reverse();
        let boats = filter({ sObject: 'Boat' }, references);
        let catches = filter({ sObject: 'Catch' }, references);
        let samples = filter({ sObject: 'Sample' }, references);

        expect(references.length).to.eql(17);

        expect(boats.length).to.eql(3);
        expect(boats[0].fields.fisher_name).to.eql('not_on_list');
        expect(boats[0].fields.boat_owner_manual).to.eql('Test 3');

        expect(catches.length).to.eql(5);
        expect(catches[0].fields.BoatID).to.eql(1);
        expect(catches[1].fields.BoatID).to.eql(1);
        expect(catches[2].fields.BoatID).to.eql(8);
        expect(catches[3].fields.BoatID).to.eql(8);
        expect(samples.length).to.eql(9);
      })
      .then(done)
      .catch(done);
  });

  it('can create 3 Boats', done => {
    let operations = steps(
      each(
        '$.data.data[*].rpt_boats[*]',
        create(
          'Boat',
          fields(
            field('fisher_name', sourceValue('$.data.fisher_name')),
            field(
              'engine_capacity_units',
              sourceValue('$.data.engine_capacity_units')
            )
          )
        )
      )
    );

    afterExecutionOf(operations)
      .then(state => {
        let references = state.references.reverse();
        expect(references.length).to.eql(3);
      })
      .then(done)
      .catch(done);
  });

  it('can create 3 Boats from inside a combine', done => {
    let operations = steps(
      each(
        '$.data.data[*].rpt_boats[*]',
        combine(
          create(
            'Fisherman',
            fields(field('fisher_name', sourceValue('$.data.fisher_name')))
          ),
          create(
            'Boat',
            fields(field('engine_capacity_units', sourceValue('$.data.start')))
          )
        )
      )
    );

    afterExecutionOf(operations)
      .then(state => {
        let references = state.references.reverse();
        expect(references.length).to.eql(6);
      })
      .then(done)
      .catch(done);
  });
});
