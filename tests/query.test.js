import expect from "expect";

import { query } from '../index';

describe("Query", () => {
  let q;
  beforeEach(function() {
    q = query(function*() {
      yield {};
      yield {};
      yield {};
    });
  });

  it('plays back a generator', function() {
    let [...result] = q;
    expect(result).toEqual([{},{},{}]);
  });

  it('can count itself', function() {
    expect(q.length).toEqual(3);
  });
});
