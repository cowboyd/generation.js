import expect from "expect";

import { reduce } from '../index';

describe('reduce', ()=> {
  it('reduces', ()=> {
    expect(reduce([1, 2, 4], (sum, x) => sum + x, 0)).toEqual(7);
  });
});
