import { renderHook, act } from '@testing-library/react-hooks';

import { useCells } from '../../hooks/useCells.js';

import { createCells } from '../../helpers/create2DArray.js';

describe('useCells', () => {
  const { result } = renderHook(() => useCells(3, 4));
  const cells = result.current.cells;
  const copyOfCells = result.current.copyOfCells();
  describe('cells', () => {
    it('should return the same as createCells() when first called with same values', () => {
      const sample = createCells(3, 4);
      expect(cells).toStrictEqual(sample);
    });
  });
  describe('copyOfCells()', () => {
    it('should return a deep copy of cells', () => {
      expect(copyOfCells).not.toBe(cells);
      expect(copyOfCells).toStrictEqual(cells);
    });
  });
});
