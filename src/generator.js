export default function generator(iterable) {
  return function* generate() {
    yield* iterable[Symbol.iterator]();
  }
}
