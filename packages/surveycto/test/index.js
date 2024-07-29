import { expect } from 'chai';

import ClientFixtures, { fixtures } from './ClientFixtures';

import Adaptor from '../src';
import { convertDate, dateRegex } from '../src/Utils';

const { execute } = Adaptor;

describe('execute', () => {
  it.skip('executes each operation in sequence', done => {
    let state = {};
    let operations = [
      state => {
        return { counter: 1 };
      },
      state => {
        return { counter: 2 };
      },
      state => {
        return { counter: 3 };
      },
    ];

    execute(...operations)(state)
      .then(finalState => {
        expect(finalState).to.eql({ counter: 3 });
      })
      .then(done)
      .catch(done);
  });

  it.skip('assigns references, data to the initialState', () => {
    let state = {};

    let finalState = execute()(state);

    execute()(state).then(finalState => {
      expect(finalState).to.eql({
        references: [],
        data: null,
      });
    });
  });
});

describe('convert date', () => {
  it('should convert an ISO string', () => {
    const date = '2024-04-23T12:00:43.092Z';
    const result = convertDate(date);
    expect(result).to.eql('Apr 23, 2024 12:00:43 PM');
  });
  it('should convert Date.toString()', () => {
    const date = new Date('2024-04-23T12:00:43.092Z').toString();
    const result = convertDate(date);
    expect(result).to.eql('Apr 23, 2024 12:00:43 PM');
  });
  it('should convert a date Object', () => {
    const date = new Date('2024-04-23T12:00:43.092Z');
    const result = convertDate(date);
    expect(result).to.eql('Apr 23, 2024 12:00:43 PM');
  });
  it('should convert an epoch time', () => {
    const date = new Date('2024-04-23T12:00:43.092Z').getTime();
    const result = convertDate(date);
    expect(result).to.eql('Apr 23, 2024 12:00:43 PM');
  });
  it('should convert a unix time', () => {
    const date = Math.floor(
      new Date('2024-04-23T12:00:43.092Z').getTime() / 1000
    );
    const result = convertDate(date);
    expect(result).to.eql('Apr 23, 2024 12:00:43 PM');
  });
});

describe('date regex', () => {
  const match = [
    'Oct 13, 2015 10:53:04 AM',
    'Oct 13, 2015 10:53:04 PM',
    'Oct 01, 2015 10:53:04 PM',
    'Oct 13, 2015 10:53 PM', // regex will match this but I don't know if that's right?
    'Feb 29, 1994 01:00:04 PM',
    'Feb 29, 1994 00:00:00 AM',
    // nonsense dates will still pass the regex
    'feb 00, 3001 33:33:33 AM',
    'bob 99, 3001 99:99:99 PM',
  ];
  match.forEach(m => {
    it(`should match ${m}`, () => {
      expect(dateRegex.test(m)).to.eql(true);
    });
  });

  const fail = [
    'Oct 13, 2015 10:53:04 BC',
    'today',
    'mtuchi',
    'October 13, 2015 10:53:04 PM',
    'O 1, 2015 10:53:04 PM',
    'Oct 13, 2015 10:53:04',
    'Oct 13, 2015',
    'Oct 13 2015',
    'Oct 13, 2015 10:53:04 A',
    '10:53:04 PM',
    new Date().toISOString(),
  ];
  fail.forEach(m => {
    it(`should not match ${m}`, () => {
      expect(dateRegex.test(m)).to.eql(false);
    });
  });
});
