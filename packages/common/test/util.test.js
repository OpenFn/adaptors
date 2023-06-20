import { expect } from 'chai';
import { expandReferences } from '../src/util';

describe('util', () => {
  it('should not expand references', () => {
    const name = 'mulder';
    const state = {};

    const [resolvedName] = expandReferences(state, name)

    expect(resolvedName).to.equal('mulder')
  });

  it('should expand function references', () => {
    const state = { name: 'mulder' };
    const name = (s) => s.name;

    const [resolvedName] = expandReferences(state, name)

    expect(resolvedName).to.equal('mulder')
  });

  it('should recursively expand function references', () => {
    const state = { name: 'mulder' };
    const name = (s) => (s) => s.name;

    const [resolvedName] = expandReferences(state, name)

    expect(resolvedName).to.equal('mulder')
  });

  it('should expand multiple referencws', () => {
    const state = { name: 'mulder', truth: 'out there' };
    const name = (s) => s.name;
    const truth = (s) => s.truth;

    const [resolvedName, resolvedTruth] = expandReferences(state, name, truth)

    expect(resolvedName).to.equal('mulder')
    expect(resolvedTruth).to.equal('out there')
  });

  it('should expand array references', () => {
    const state = { name: 'mulder' };
    const name = ['fox', (s) => s.name];

    const [resolvedName] = expandReferences(state, name)

    const [fname, sname] = resolvedName;
    expect(fname).to.equal('fox')
    expect(sname).to.equal('mulder')
  });

  it('should expand object references', () => {
    const state = { name: 'mulder' };
    const name = {
      first: 'fox',
      second: (s) => s.name
    };

    const [resolvedName] = expandReferences(state, name)

    expect(resolvedName.first).to.equal('fox')
    expect(resolvedName.second).to.equal('mulder')
  });
});