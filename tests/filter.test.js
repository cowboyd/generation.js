import expect from "expect"

import { filter } from '../index';

describe('filtering generation``', function() {
  let filtered;
  beforeEach(function() {
    filtered = filter([ 1,2,3,4 ], x => (x % 2)  === 0);
  });

  it('keeps the items specified by the predicate, but not those excluded by it', function() {
    let [...result] = filtered;
    expect(result).toEqual([2,4])
  });
});
