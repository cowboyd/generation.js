import Query from './src/query';

export function query(iterable) {
  return new Query(iterable);
}

export function map(iterable, fn) {
  return query(iterable).map(fn);
}

export function filter(iterable, fn) {
  return query(iterable).filter(fn);
}

export function concat(...iterables) {
  return iterables.reduce((query, iterable) => {
    return query.concat(iterable);
  }, query());
}

export function union(...iterables) {
  return iterables.reduce((query, iterable) => {
    return query.union(iterable);
  }, query());
}

export function intersect(first, ...iterables) {
  if (first) {
    return query(first).intersect(union(...iterables));
  } else {
    return query();
  }
}

export function disjunct(...iterables) {
  return iterables.reduce((query, iterable) => {
    return query.disjunct(iterable);
  }, query())
}

export function reduce(source, fn, initial) {
  return query(source).reduce(fn, initial);
}

export function equals(left, right) {
  return query(left).equals(right);
}
