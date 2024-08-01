import { expect } from 'chai';
import parseDate from '../../src/util/parse-date';
import { startOfDay, subDays, subHours } from 'date-fns';

// Check if two date are the same to ms resolution
// Ie, cut off the nanoseconds of the date
// there is a vanishingly small chance that dates could be 1ns apart
// but cross an ms line - there's only so much we can do about this
const approxEqual = (a, b) => {
  const a_ms = a.substring(0, a.length - 5);
  const b_ms = a.substring(0, a.length - 5);
  expect(a_ms).eql(b_ms);
};

describe('parse date', () => {
  it('should return now', () => {
    const today = new Date().toISOString();

    const result = parseDate('now').toISOString();
    approxEqual(result, today);
  });

  it('should return start of today', () => {
    const today = startOfDay(new Date()).toISOString();

    const result = parseDate('today').toISOString();
    expect(result).eql(today);
  });

  it('should return start of yesterday', () => {
    const yesterday = startOfDay(subDays(new Date(), 1)).toISOString();

    const result = parseDate('yesterday').toISOString();
    expect(result).eql(yesterday);
  });

  it('should return 1 hour ago', () => {
    const target = subHours(new Date(), 1).toISOString();

    const result = parseDate('1 hour ago').toISOString();
    approxEqual(result, target);
  });

  it('should return 1 hours ago', () => {
    const target = subHours(new Date(), 1).toISOString();

    const result = parseDate('1 hours ago').toISOString();
    approxEqual(result, target);
  });

  it('should return 0001 hours ago', () => {
    const target = subHours(new Date(), 1).toISOString();

    const result = parseDate('0001 hours ago').toISOString();
    approxEqual(result, target);
  });

  it('should return 333 hours ago', () => {
    const target = subHours(new Date(), 333).toISOString();

    const result = parseDate('333 hours ago').toISOString();
    approxEqual(result, target);
  });

  it('should return 1 day ago', () => {
    const target = subDays(new Date(), 1).toISOString();

    const result = parseDate('1 day ago').toISOString();
    approxEqual(result, target);
  });

  it('should return 1 days ago', () => {
    const target = subDays(new Date(), 1).toISOString();

    const result = parseDate('1 days ago').toISOString();
    approxEqual(result, target);
  });

  it('should return 2 days ago', () => {
    const target = startOfDay(subDays(new Date(), 2)).toLocaleString();
    const result = parseDate('2 days ago').toLocaleString();
    expect(result).eql(target);
  });

  it('should return 9999 days ago', () => {
    const target = startOfDay(subDays(new Date(), 9999)).toISOString();

    const result = parseDate('9999 days ago').toISOString();
    expect(result).eql(target);
  });

  it('should return start', () => {
    const start = subHours(new Date(), 1).toISOString();

    const result = parseDate('start', start);
    expect(result).eql(start);
  });

  it('should return a date', () => {
    const date = subHours(new Date(), 3).toISOString();

    const result = parseDate(date);
    expect(result).eql(date);
  });
});
