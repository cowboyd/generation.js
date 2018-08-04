import expect from 'expect';
import { union } from '../index';

describe('concatenating to iterables', function() {
  let unioned;
  beforeEach(function() {
    unioned = union([ 1, 2, 3], [3,4, 4, 5], [5, 6, 7, 1]);
  });
  it('creates a query excludes duplicates', function() {
    let [...result] = unioned;
    expect(result).toEqual([1, 2, 3, 4, 5, 6, 7]);
  });
});
