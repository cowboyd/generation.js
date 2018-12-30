import expect from "expect";

import Query from '../src/query';

describe("Query", () => {
  let query;
  beforeEach(function() {
    query = new Query(function*() {
      yield {};
      yield {};
      yield {};
    });
  });

  it('plays back a generator', function() {
    let [...result] = query;
    expect(result).toEqual([{},{},{}]);
  });

  it('can count itself', function() {
    expect(query.length).toEqual(3);
  });

  describe('caching queries', () => {
    let source = function* () {
      yield 1;
      yield 2;
      yield 3;
    };
    let query = new Query(function* () {
      yield* source();
    });

    describe('when the underlying source remains constant', () => {
      let result;
      beforeEach(function() {
        [...result] = query;
      });
    });
  });
})
