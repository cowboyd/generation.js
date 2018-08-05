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

  map(fn) {
    return new Query(function*() {
      for (let x of this) {
        yield fn(x);
      }
    }.bind(this));
  }

  filter(fn) {
    return new Query(function*() {
      for (let item of this) {
        if (fn(item)) {
          yield item;
        }
      }
    }.bind(this))
  }

  concat(query) {
    return new Query(function*() {
      yield* this;
      yield* query;
    }.bind(this));
  }

  union(query) {
    return new Query(function*() {
      let seen = new Set();
      for (let x of this) {
        if (!seen.has(x)) {
          seen.add(x);
          yield x;
        }
      }
      for (let y of query) {
        if (!seen.has(y)) {
          seen.add(y);
          yield y;
        }
      }
    }.bind(this));
  }

  intersect(query) {
    return new Query(function*() {
      let seen = new Set();
      for (let x of this) {
        seen.add(x);
      }
      for (let y of query) {
        if (seen.has(y)) {
          yield y;
        }
      }
    }.bind(this));
  }
}

Query.prototype[Symbol.iterator] = function* iterator() {
  let cache = [];

  this[Symbol.iterator] = function* iterateCache() {
    yield* cache;
  }

  for (let item of this.generator()) {
    cache.push(item);
    yield item;
  }
}
