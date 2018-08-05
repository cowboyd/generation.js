import expect from "expect"

import { map } from '../index';

describe('filtering query``', function() {
  let mapped;
  beforeEach(function() {
    mapped = map([ 1,2,3,4 ], x => x * 2);
  });

  it('keeps the items specified by the predicate, but not those excluded by it', function() {
    let [...result] = mapped;
    expect(result).toEqual([2, 4, 6, 8 ]);
  });
});
