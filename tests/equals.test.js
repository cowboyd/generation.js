import expect from 'expect';

import { query } from '../index';

describe('equals', ()=> {
  it('understands when two queries are equal', ()=> {
    expect(query().equals(query())).toBe(true);
    expect(query([1,2,3]).equals([1,2,3])).toBe(true);
  });
  it('understands when two queries are not equal', ()=> {
    expect(query([1,2]).equals([1,2,3])).toBe(false);
  });
});
