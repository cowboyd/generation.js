import expect from 'expect';

import generator from '../src/generator';

describe('generate', function() {
  it('generates an iterable', function() {
    let [...result] = generator([1, 2, 3])();
    expect(result).toEqual([1, 2, 3]);
  });
});
