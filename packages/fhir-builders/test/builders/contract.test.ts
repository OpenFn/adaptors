import { expect } from 'chai';

import contract from '../../src/builders/contract';
import { Contract } from 'fhir/r5';

describe('Contract v5', () => {
  it('should create a basic contact', () => {
    const c = contract({ author: { id: 'x ' } }, '5');
    const c_json: Contract = c.toJSON();

    expect(c_json).to.eql({
      resourceType: 'Contract',
      author: { id: 'x ' },
    });
  });

  it('should set the contact name', () => {
    const c = contract({}, '5');

    c.name({ text: 'bruce wayne' });

    const json = c.toJSON();
    expect(json.name).to.eql([{ text: 'bruce wayne', use: 'official' }]);
  });

  it('should chain on name', () => {
    const c = contract({}, '5');

    c.name({ text: 'bruce wayne' }).name({ text: 'batman', use: 'nickname' });

    const json = c.toJSON();
    console.log(json);
    expect(json.name[0]).to.eql({ text: 'bruce wayne', use: 'official' });
    expect(json.name[1]).to.eql({ text: 'batman', use: 'nickname' });
  });

  it('should change scope on term', () => {
    const c = contract({}, '5');

    const term = c.term({});

    // term should not have name
    expect(term).not.to.haveOwnProperty('name');

    // But should have other helpers
    expect(term).to.haveOwnProperty('root');
    expect(term).to.haveOwnProperty('toJSON');
    expect(term).to.haveOwnProperty('toString');
  });

  it('should set term.issued', () => {
    const c = contract({}, '5').term().issued('today');

    const json = c.toJSON();

    expect(json.term).to.eql({
      issued: 'today',
    });
  });

  it('should set term.action.reason', () => {
    const c = contract({}, '5')
      .term()
      .action()
      // TODO would love a good example of this, docs are vague
      .reason({ concept: 'Report', reference: '1234' });

    const json = c.toJSON();

    expect(json.term.action.reason).to.eql({
      concept: 'Report',
      reference: '1234',
    });
  });
});

describe('Contract v4', () => {
  it('should create a contact', () => {
    const c = contract({}, '4');

    c.name({});

    const json = c.toJSON();
    console.log(json);
  });

  it('should set term.action.reason', () => {
    const c = contract({}, '4')
      .term()
      // TODO would love a good example of this, docs are vague
      .action({ reason: 'cancelled', reasonCode: '1234' });

    const json = c.toJSON();

    expect(json.term.action).to.eql({
      reason: 'cancelled',
      reasonCode: '1234',
    });
  });
});
