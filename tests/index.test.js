import expect from 'expect';

import { query, filter, map, union, intersect, disjunct, equals } from '../index';

describe('index', () => {
  it('exports the important things', () => {
    expect(query).toBeInstanceOf(Function);
    expect(filter).toBeInstanceOf(Function);
    expect(map).toBeInstanceOf(Function);
    expect(union).toBeInstanceOf(Function);
    expect(intersect).toBeInstanceOf(Function);
    expect(disjunct).toBeInstanceOf(Function);
    expect(equals).toBeInstanceOf(Function);
  });
});
