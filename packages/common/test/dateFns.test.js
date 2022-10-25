import { expect } from 'chai';
import { add } from 'date-fns';
import * as dateFns from '../src/dateFns';

describe('date fns', () => {
  it('should parse a random given date', () => {
    const badString1 = '11:31AM Oct 23-2019';
    const formatter1 = 'hh:mmaa MMM dd-yyyy';

    const parsedDate = dateFns.parse(badString1, formatter1, new Date());

    const offset = parsedDate.getTimezoneOffset();
    const target = add(parsedDate, { minutes: -offset });

    expect(target.toISOString()).equal('2019-10-23T11:31:00.000Z');
  });

  it('should format a date with a given format', () => {
    const badString1 = '11:31AM Oct 23-2019';
    const formatter1 = 'hh:mmaa MMM dd-yyyy';

    const parsedDate = dateFns.parse(badString1, formatter1, new Date());

    const formattedDate1 = dateFns.format(parsedDate, 'dd-MM-yyyy');
    const formattedDate2 = dateFns.format(parsedDate, 'MM-dd-yyyy');
    expect(formattedDate1).equal('23-10-2019');
    expect(formattedDate2).equal('10-23-2019');
  });
});
