import expect from 'expect';
import { intersect } from '../index';

describe('concatenating to iterables', function() {
  let intersection;
  beforeEach(function() {
    intersection = intersect([ 1, 2, 3], [3,4, 4, 5], [5, 6, 7, 1]);
  });
  it('creates a query excludes duplicates', function() {
    let [...result] = intersection;
    expect(result.length).toEqual(2);
    expect(result.includes(1)).toBe(true);
    expect(result.includes(3)).toBe(true);
  });
});
