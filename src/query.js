export default class Query {
  constructor(generator) {
    this[Symbol.iterator] = function*() {
      return yield* generator();
    };
  }

  recompute() {
    return this;
  }
}
