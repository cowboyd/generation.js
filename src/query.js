export default class Query {
  constructor(generator = function* empty() {}) {
    this.generator = generator;
  }

  recompute() {
    let again = new Query(this.generator);
    let [...next] = again;
    let [...current] = this;
    if (next.length === current.length && next.every((item, i) => item === current[i])) {
      return this;
    } else {
      return again;
    }
  }

  filter(fn) {
    let self = this;
    return new Query(function*() {
      for (let item of self) {
        if (fn(item)) {
          yield item;
        }
      }
    })
  }

  concat(query) {
    let self = this;
    return new Query(function*() {
      yield* self;
      yield* query;
    });
  }

  union(query) {
    let self = this;
    return new Query(function*() {
      let seen = new Map();
      for (let x of self) {
        if (!seen.has(x)) {
          seen.set(x, true);
          yield x;
        }
      }
      for (let y of query) {
        if (!seen.has(y)) {
          seen.set(y, true);
          yield y;
        }
      }
    });
  }

  intersect(query) {
    let self = this;
    return new Query(function*() {
      let seen = new Map();
      for (let x of self) {
        seen.set(x, true);
      }
      for (let y of query) {
        if (seen.has(y)) {
          yield y;
        }
      }
    });
  }
}

Query.prototype[Symbol.iterator] = function* iterator() {
  let cache = [];

  this[Symbol.iterator] = function* iterateCache() {
    yield* iterate(cache);
  }

  for (let item of this.generator()) {
    cache.push(item);
    yield item;
  }
}

function iterate(iterable) {
  return iterable[Symbol.iterator]();
}
