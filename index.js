import Query from './src/query';
import generator from './src/generator';

export function map(iterable, fn) {
  return new Query(generator(iterable)).map(fn);
}

export function filter(iterable, fn) {
  return new Query(generator(iterable)).filter(fn);
}

export function concat(...iterables) {
  return iterables.reduce((query, iterable) => {
    return query.concat(iterable);
  }, new Query());
}

export function union(...iterables) {
  return iterables.reduce((query, iterable) => {
    return query.union(iterable);
  }, new Query());
}

export function intersect(first, ...iterables) {
  if (first) {
    return new Query(generator(first)).intersect(union(...iterables));
  } else {
    return new Query();
  }
}
