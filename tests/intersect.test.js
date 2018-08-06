import expect from 'expect';
import { intersect } from '../index';

describe('unioning two queries', function() {
  let intersection;
  beforeEach(function() {
    intersection = intersect([ 1, 2, 3], [3,4, 4, 5], [5, 6, 7, 1]);
  });
  it('creates a query only containining those elements in both sates', function() {
    let [...result] = intersection;
    expect(result.length).toEqual(2);
    expect(result.includes(1)).toBe(true);
    expect(result.includes(3)).toBe(true);
  });
});
