import { idToIJ } from '../../helpers/idToIJ.js';

describe('idToIJ()', () => {
  test('should return an Array of length 2', () => {
    expect(idToIJ(42, 7)).toBeInstanceOf(Array);
    expect(idToIJ(42, 7).length).toBe(2);
  });
  test('should work for id < cols', () => {
    expect(idToIJ(3, 6)).toStrictEqual([3, 0]);
  });
  test('should work for id > cols', () => {
    expect(idToIJ(11, 6)).toStrictEqual([5, 1]);
  });
})
