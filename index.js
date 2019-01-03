import _Generation from './src/generation';

export function Generation(iterable) {
  return new _Generation(iterable);
}

export function map(iterable, fn) {
  return Generation(iterable).map(fn);
}

export function filter(iterable, fn) {
  return Generation(iterable).filter(fn);
}

export function concat(...iterables) {
  return iterables.reduce((generation, iterable) => {
    return generation.concat(iterable);
  }, Generation());
}

export function union(...iterables) {
  return iterables.reduce((generation, iterable) => {
    return generation.union(iterable);
  }, Generation());
}

export function intersect(first, ...iterables) {
  if (first) {
    return Generation(first).intersect(union(...iterables));
  } else {
    return Generation();
  }
}

export function disjunct(...iterables) {
  return iterables.reduce((generation, iterable) => {
    return generation.disjunct(iterable);
  }, Generation())
}

export function reduce(source, fn, initial) {
  return Generation(source).reduce(fn, initial);
}

export function equals(left, right) {
  return Generation(left).equals(right);
}
