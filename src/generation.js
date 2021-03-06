import generator from './generator';

export default class Generation {
  constructor(source = []) {
    Object.defineProperty(this, Symbol.iterator, {
      value: generator(source)
    });
  }

  get length() {
    let length = 0;
    for (let x of this) { length++; }
    return length;
  }

  equals(source) {
    return this.disjunct(source).length === 0;
  }

  map(fn) {
    return new Generation(function*() {
      for (let x of this) {
        yield fn(x);
      }
    }.bind(this));
  }

  filter(fn) {
    return new Generation(function*() {
      for (let item of this) {
        if (fn(item)) {
          yield item;
        }
      }
    }.bind(this))
  }

  concat(source) {
    return new Generation(function*() {
      yield* this;
      yield* new Generation(source);
    }.bind(this));
  }

  union(source) {
    return new Generation(function*() {
      let seen = new Set();
      for (let x of this) {
        if (!seen.has(x)) {
          seen.add(x);
          yield x;
        }
      }
      for (let y of new Generation(source)) {
        if (!seen.has(y)) {
          seen.add(y);
          yield y;
        }
      }
    }.bind(this));
  }

  intersect(source) {
    return new Generation(function*() {
      let seen = new Set();
      for (let x of new Generation(source)) {
        seen.add(x);
      }
      yield* this.filter(y => seen.has(y))
    }.bind(this));
  }

  disjunct(source) {
    return new Generation(function*() {
      let seen = new Set();
      let disjunction = new Set();
      for (let x of this) {
        seen.add(x)
        disjunction.add(x);
      }
      for (let y of new Generation(source)) {
        if (seen.has(y)) {
          disjunction.delete(y);
        } else {
          yield y;
        }
      }
      yield* disjunction;
    }.bind(this))
  }

  reduce(fn, initial) {
    let result = initial;
    function reduce(fn, iterator, result) {
      let next = iterator.next();
      if (next.done) {
        return result;
      } else {
        return reduce(fn, iterator, fn(result, next.value))
      }
    }

    return reduce(fn, this[Symbol.iterator](), initial);
  }
}
