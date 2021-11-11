import { idToIJ } from '../../helpers/idToIJ.js';

describe('idToIJ()', () => {
  it('should return an Array of length 2', () => {
    const sample = idToIJ(42, 7);
    expect(sample).toBeInstanceOf(Array);
    expect(sample.length).toBe(2);
  });
  it('should work for id < cols', () => {
    expect(idToIJ(3, 6)).toStrictEqual([3, 0]);
  });
  it('should work for id > cols', () => {
    expect(idToIJ(11, 6)).toStrictEqual([5, 1]);
  });
})
