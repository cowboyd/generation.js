import expect from 'expect';

import { Query, filter, map, union, intersect, disjunct } from '../index';

describe('index', () => {
  it('exports the important things', () => {
    expect(Query).toBeInstanceOf(Function);
    expect(filter).toBeInstanceOf(Function);
    expect(map).toBeInstanceOf(Function);
    expect(union).toBeInstanceOf(Function);
    expect(intersect).toBeInstanceOf(Function);
    expect(disjunct).toBeInstanceOf(Function);
  });
});
