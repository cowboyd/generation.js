import expect from "expect";

import Query from '../src/query';

describe("Query", () => {
  it('plays back a generator', function() {
    let [...result] = new Query(function*() {
      yield 1;
      yield 2;
      yield 3;
    })
    expect(result).toEqual([1,2,3]);
  });

  describe('caching queries', () => {
    let source = function*() {
      yield 1;
      yield 2;
      yield 3;
    };
    let query = new Query(function* () {
      yield* source();
    });
    let [...result] = query;
    describe('when the underlying source remains constant', () => {
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
