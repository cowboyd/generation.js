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
  it('replays the same iterator the second time', function() {
    let [one, two, three] = query;
    let [_one, _two, _three ] = query;
    expect(_one).toBe(one);
    expect(_two).toBe(two);
    expect(_three).toBe(three);
  });

  it('can count itself', function() {
    expect(query.length).toEqual(3);
  });

  it('does not do any computation on a recompute if it has not been computed already', function() {
    let query = new Query(function*() { throw new Error('boom!')});
    expect(query.recompute()).toBe(query);
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

      it('returns itself when asked to recompute', function() {
        let [...again] = query;
        expect(again).toEqual(result);
        expect(query.recompute()).toBe(query);
      });
    });
    describe('when the underlying source changes', () => {
      beforeEach(function() {
        source = function* () {
          yield 5;
        }
      });

      it('returns a new query pointing to the source, but with the cache pre-filled', function() {
        let recomputed = query.recompute();
        let [...again] = recomputed;
        expect(recomputed).not.toBe(query);
        expect(again).toEqual([5]);
      });
    });

  })
})
