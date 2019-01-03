import expect from 'expect';

import Default, { Generation, filter, map, union, intersect, disjunct, equals } from '../index';

describe('index', () => {
  it('exports the important things', () => {
    expect(Generation).toBeInstanceOf(Function);
    expect(Default).toBe(Generation);
    expect(filter).toBeInstanceOf(Function);
    expect(map).toBeInstanceOf(Function);
    expect(union).toBeInstanceOf(Function);
    expect(intersect).toBeInstanceOf(Function);
    expect(disjunct).toBeInstanceOf(Function);
    expect(equals).toBeInstanceOf(Function);
  });
});
