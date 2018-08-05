export default function generator(source) {
  if (typeof source === 'function') {
    return source;
  } else if (typeof source[Symbol.iterator] === 'function') {
    return function* generate() {
      yield* source;
    }
  } else {
    throw new Error(`'${source}' must be either a generator function or an iterable`);
  }
}
