import { setDefaultRegions } from '../../helpers/setDefaultRegions.js';

describe('setDefaultRegions()', () => {
  it('should return an Array of Arrays of correct dimensions', () => {
    const sample = setDefaultRegions(3, 3);
    expect(sample).toBeInstanceOf(Array);
    expect(sample.length).toBe(3);
    expect(sample.every(element => Array.isArray(element))).toBeTruthy();
    expect(sample.every(element => element.length === 3)).toBeTruthy();
  });
  it('should work when regions should equal rows', () => {
    const sample = setDefaultRegions(3, 3);
    const target = [
        [0, 0, 0],
        [1, 1, 1],
        [2, 2, 2]
      ];
    expect(sample).toStrictEqual(target);
  });
  it('should work when regions should be square', () => {
    const sample = setDefaultRegions(4, 4);
    const target = [
        [0, 0, 1, 1],
        [0, 0, 1, 1],
        [2, 2, 3, 3],
        [2, 2, 3, 3]
      ];
    expect(sample).toStrictEqual(target);
  });
  it('should work when regions should be rectangles', () => {
    const sample = setDefaultRegions(6, 6);
    const target = [
        [0, 0, 0, 1, 1, 1],
        [0, 0, 0, 1, 1, 1],
        [2, 2, 2, 3, 3, 3],
        [2, 2, 2, 3, 3, 3],
        [4, 4, 4, 5, 5, 5],
        [4, 4, 4, 5, 5, 5]
      ];
    expect(sample).toStrictEqual(target);
  });
});
