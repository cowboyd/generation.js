import Query from './src/query';
import generator from './src/generator';

export function filter(iterable, fn) {
  return new Query(generator(iterable)).filter(fn);
}
