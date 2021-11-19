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
  describe('undo()', () => {
    const original = JSON.parse(JSON.stringify(result.current.cells));
    const stepOne = JSON.parse(JSON.stringify(result.current.cells));
    stepOne[0].entry = 'star';
    act(() => {
      result.current.setCells(stepOne);
    });
    const stepTwo = JSON.parse(JSON.stringify(result.current.cells));
    stepTwo[0].entry = 'dot';
    stepTwo[1].entry = 'dot';
    act(() => {
      result.current.setCells(stepTwo);
    });
    it('should allow you to undo once', () => {
      expect(result.current.cells[0].entry).toBe('dot');
      expect(result.current.cells[1].entry).toBe('dot');
      act(() => { result.current.undo(); });
      expect(result.current.cells[0].entry).toBe('star');
      expect(result.current.cells[1]?.entry).toBe(null);
      expect(result.current.cells).toStrictEqual(stepOne);
    });
    it('should allow you to undo twice', () => {
      act(() => { result.current.undo(); });
      expect(result.current.cells).toStrictEqual(original);
    });
    it('should not cause an error when nothing is left to undo', () => {
      act(() => { result.current.undo(); });
      expect(result.current.cells).toStrictEqual(original);
    });
  });
});
