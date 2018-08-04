import expect from 'expect';
import { concat } from '../index';

describe('concatenating to iterables', function() {
  let concatenated;
  beforeEach(function() {
    concatenated = concat([1,2], [3,4], [5, 6]);
  });
  it('creates a query that yields all the iterables concatenated together', function() {
    let [...result] = concatenated;
    expect(result).toEqual([1, 2, 3, 4, 5, 6]);
  });
});
