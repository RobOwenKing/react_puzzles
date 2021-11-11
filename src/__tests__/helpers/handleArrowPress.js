import { handleArrowPress } from '../../helpers/handleArrowPress.js';

describe('handleArrowPress()', () => {
  // Using non-square grid in tests as future-proofing
  const rows = 4;
  const cols = 6;
  it('should return an Array', () => {
    expect(handleArrowPress('ArrowUp', false, false, [0], rows, cols)).toBeInstanceOf(Array);
  });
  it('should let you move right', () => {
    expect(handleArrowPress('ArrowRight', false, false, [7], rows, cols)).toStrictEqual([8]);
  });
  it('should let you move left', () => {
    expect(handleArrowPress('ArrowLeft', false, false, [7], rows, cols)).toStrictEqual([6]);
  });
  it('should let you move up', () => {
    expect(handleArrowPress('ArrowUp', false, false, [7], rows, cols)).toStrictEqual([1]);
  });
  it('should let you move Down', () => {
    expect(handleArrowPress('ArrowDown', false, false, [7], rows, cols)).toStrictEqual([13]);
  });
  it('should let you move right and wrap around when necessary', () => {
    expect(handleArrowPress('ArrowRight', false, false, [5], rows, cols)).toStrictEqual([0]);
  });
  it('should let you move left and wrap around when necessary', () => {
    expect(handleArrowPress('ArrowLeft', false, false, [6], rows, cols)).toStrictEqual([11]);
  });
  it('should let you move up and wrap around when necessary', () => {
    expect(handleArrowPress('ArrowUp', false, false, [2], rows, cols)).toStrictEqual([20]);
  });
  it('should let you move Down and wrap around when necessary', () => {
    expect(handleArrowPress('ArrowDown', false, false, [23], rows, cols)).toStrictEqual([5]);
  });
  it('should not remove passed value when holding ctrl', () => {
    expect(handleArrowPress('ArrowRight', true, false, [17], rows, cols)).toStrictEqual([17, 12]);
  });
  it('should not remove passed value when holding shift', () => {
    expect(handleArrowPress('ArrowDown', false, true, [3], rows, cols)).toStrictEqual([3, 9]);
  });
  it('should add new cell based on last cell when holding ctrl', () => {
    expect(handleArrowPress('ArrowDown', true, false, [0, 1, 2], rows, cols)).toStrictEqual([0, 1, 2, 8]);
  });
});
