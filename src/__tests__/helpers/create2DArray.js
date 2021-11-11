import { create2DArray, createCells } from '../../helpers/create2DArray.js';
import { idToIJ } from '../../helpers/idToIJ.js';

describe('create2DArray()', () => {
  it('should return an Array of Arrays of correct dimensions', () => {
    const sample = create2DArray(3, 4);
    expect(sample).toBeInstanceOf(Array);
    expect(sample.length).toBe(3);
    expect(sample.every(element => Array.isArray(element))).toBeTruthy();
    expect(sample.every(element => element.length === 4)).toBeTruthy();
  });
  it('should return an Array of Arrays of correct dimensions (given fillValue)', () => {
    const sample = create2DArray(4, 2, true);
    expect(sample).toBeInstanceOf(Array);
    expect(sample.length).toBe(4);
    expect(sample.every(element => element.length === 2)).toBeTruthy();
  });
  it('should use given fillValue', () => {
    const sample = create2DArray(3, 3, 'fill');
    expect(sample.every((row) => {
        return row.every(element => element === 'fill')
      })).toBeTruthy();
  });
});

describe('createCells()', () => {
  it('should return an Array of correct length', () => {
    const sample = createCells(3, 4);
    expect(sample).toBeInstanceOf(Array);
    expect(sample.length).toBe(3 * 4);
  });
  it('should give each element the correct id', () => {
    const sample = createCells(3, 4);
    expect(sample.every((element, index) => element['id'] === index)).toBeTruthy();
  });
  it('should give each element i and j matching the id', () => {
    const sample = createCells(4, 3);
    expect(sample.every(element => {
        const [i, j] = idToIJ(element['id'], 3);
        return i === element['i'] && j === element['j'];
      })).toBeTruthy();
  })
});
