import { create2DArray, createCells } from '../../helpers/create2DArray.js';

describe('create2DArray()', () => {
  it('should return an Array of Arrays of correct dimensions', () => {
    const sample = create2DArray(3, 4);
    expect(sample).toBeInstanceOf(Array);
    expect(sample.length).toBe(3);
    expect(sample.every(element => element.length === 4)).toBe(true);
  });
  it('should return an Array of Arrays of correct dimensions (given fillValue)', () => {
    const sample = create2DArray(4, 2, true);
    expect(sample).toBeInstanceOf(Array);
    expect(sample.length).toBe(4);
    expect(sample.every(element => element.length === 2)).toBe(true);
  });
  it('should use given fillValue', () => {
    const sample = create2DArray(3, 3, 'fill');
    expect(sample.every((row) => {
        return row.every(element => element === 'fill')
      })).toBe(true);
  });
});

describe('createCells()', () => {
  it('should return an Array of Arrays of correct dimensions', () => {
    const sample = createCells(3, 4);
    expect(sample).toBeInstanceOf(Array);
    expect(sample.length).toBe(3);
    expect(sample.every(element => element.length === 4)).toBe(true);
  });
});
