// import '@types/mocha';
import { expect } from 'chai';

import { create } from '../src/builders';

describe('general', () => {
  it('should create a builder function', () => {
    const b = create('x');

    expect(typeof b).to.equal('function');
  });

  it('should build a basic resource', () => {
    const b = create('patient');
    const r = b();

    expect(r).to.eql({ resourceType: 'patient' });
  });

  it('should build a basic resource with default data', () => {
    const b = create('patient');
    const r = b({ name: 'groucho' });

    expect(r).to.eql({
      resourceType: 'patient',
      name: 'groucho',
    });
  });

  it('should return with mixin functions', () => {
    const b = create('patient', [
      {
        // note: a mixin function caan't assign a property of the same name
        // could that be a problem?
        // name() can't set name
        // maybe I need a proxy?
        // if reading, use the object, if invoking, use the prototype
        x: function () {
          this.xx = 1;
          return this;
        },
      },
    ]);

    const r = b().x();

    expect(r).to.eql({
      resourceType: 'patient',
      xx: 1,
    });
  });

  it('should chain mixin functions', () => {
    const b = create('patient', [
      {
        x: function () {
          this.xx = 1;
          return this;
        },
        y: function () {
          this.yy = 1;
          return this;
        },
      },
    ]);

    const r = b().x().y();

    expect(r).to.eql({
      resourceType: 'patient',
      xx: 1,
      yy: 1,
    });
  });

  it('should not include builder functions in keys', () => {
    const b = create('patient', [{ x: () => {} }]);

    const r = b();

    expect(Object.keys(r)).to.eql(['resourceType']);
  });

  it('should stringify safely', () => {
    const b = create('patient', [{ x: () => {} }]);

    const r = b();

    const str = JSON.stringify(r);
    expect(str).to.equal('{"resourceType":"patient"}');
  });

  it('should provide a toJSON function', () => {
    const b = create('patient', [{ x: () => {} }]);

    const r = b();
    const json = r.toJSON();

    expect(json.toJSON).to.eql(undefined);
    expect(json.x).to.eql(undefined);
    expect(json).to.eql({ resourceType: 'patient' });
  });

  it('should stringify as json', () => {
    const b = create('patient', [{ x: () => {} }]);

    const r = b();
    const json = r.toString();

    expect(json).to.eql('{"resourceType":"patient"}');
  });
});
