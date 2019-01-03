import expect from "expect"

import { map } from '../index';

describe('mapping', function() {
  let mapped;
  beforeEach(function() {
    mapped = map([ 1,2,3,4 ], x => x * 2);
  });

  it('applies the mapping function to each member', function() {
    let [...result] = mapped;
    expect(result).toEqual([2, 4, 6, 8 ]);
  });
});
