import expect from 'expect';

import { Generation } from '../index';

describe('equals', ()=> {
  it('understands when two queries are equal', ()=> {
    expect(Generation().equals(Generation())).toBe(true);
    expect(Generation([1,2,3]).equals([1,2,3])).toBe(true);
  });
  it('understands when two queries are not equal', ()=> {
    expect(Generation([1,2]).equals([1,2,3])).toBe(false);
  });
});
