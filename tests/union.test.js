import expect from 'expect';
import { disjunct } from '../index';

describe('disjuctive union', function() {
  let disjunction;
  beforeEach(function() {
    disjunction = disjunct([ 1, 2, 3], [3,4, 4, 5], [5, 6, 7, 1]);
  });
  it('creates a query excludes duplicates', function() {
    let [...result] = disjunction;
    expect(result.length).toEqual(4);
    expect(result.includes(2)).toBe(true);
    expect(result.includes(4)).toBe(true);
    expect(result.includes(6)).toBe(true);
    expect(result.includes(7)).toBe(true);
  });
});
