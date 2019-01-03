import expect from "expect";

import { Generation } from '../index';

describe("Generation", () => {
  let q;
  beforeEach(function() {
    q = Generation(function*() {
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
