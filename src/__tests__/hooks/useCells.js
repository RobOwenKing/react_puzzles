import { renderHook, act } from '@testing-library/react-hooks';

import { useCells } from '../../hooks/useCells.js';

import { createCells } from '../../helpers/create2DArray.js';

describe('useCells', () => {
  describe('cells', () => {
    it('should return the same as createCells() when first called with same values', () => {
      const { result } = renderHook(() => useCells(3, 4));
      const cells = result.current.cells;
      const sample = createCells(3, 4);

      expect(cells).toStrictEqual(sample);
    });
  });
  describe('copyOfCells()', () => {
    it('should return a deep copy of cells', () => {
      const { result } = renderHook(() => useCells(3, 4));
      const cells = result.current.cells;
      const copyOfCells = result.current.copyOfCells();

      expect(copyOfCells).not.toBe(cells);
      expect(copyOfCells).toStrictEqual(cells);
    });
  });
  describe('undo()', () => {
    it('should allow you to undo once', () => {
      const { result } = renderHook(() => useCells(3, 4));
      const stepOne = JSON.parse(JSON.stringify(result.current.cells));
      stepOne[0].entry = 'star';
      const stepTwo = JSON.parse(JSON.stringify(result.current.cells));
      stepTwo[0].entry = 'dot';
      stepTwo[1].entry = 'dot';

      act(() => { result.current.setCells(stepOne); });
      act(() => { result.current.setCells(stepTwo); });

      expect(result.current.cells[0].entry).toBe('dot');
      expect(result.current.cells[1].entry).toBe('dot');

      act(() => { result.current.undo(); });

      expect(result.current.cells[0].entry).toBe('star');
      expect(result.current.cells[1]?.entry).toBe(undefined);
      expect(result.current.cells).toStrictEqual(stepOne);
    });
    it('should allow you to undo twice', () => {
      const { result } = renderHook(() => useCells(3, 4));
      const original = JSON.parse(JSON.stringify(result.current.cells));
      const stepOne = JSON.parse(JSON.stringify(result.current.cells));
      stepOne[0].entry = 'star';
      const stepTwo = JSON.parse(JSON.stringify(result.current.cells));
      stepTwo[0].entry = 'dot';
      stepTwo[1].entry = 'dot';

      act(() => { result.current.setCells(stepOne); });
      act(() => { result.current.setCells(stepTwo); });
      act(() => { result.current.undo(); });
      act(() => { result.current.undo(); });

      expect(result.current.cells).toStrictEqual(original);
    });
    it('should not cause an error when nothing is left to undo', () => {
      const { result } = renderHook(() => useCells(3, 4));
      const original = JSON.parse(JSON.stringify(result.current.cells));
      const stepOne = JSON.parse(JSON.stringify(result.current.cells));
      stepOne[0].entry = 'star';
      const stepTwo = JSON.parse(JSON.stringify(result.current.cells));
      stepTwo[0].entry = 'dot';
      stepTwo[1].entry = 'dot';

      act(() => { result.current.setCells(stepOne); });
      act(() => { result.current.setCells(stepTwo); });
      act(() => { result.current.undo(); });
      act(() => { result.current.undo(); });
      act(() => { result.current.undo(); });

      expect(result.current.cells).toStrictEqual(original);
    });
  });
  describe('canUndo()', () => {
    it('should return false at first', () => {
      const { result } = renderHook(() => useCells(3, 4));

      expect(result.current.canUndo()).toStrictEqual(false);
    });
    it('should return true when moves to undo', () => {
      const { result } = renderHook(() => useCells(3, 4));
      const stepOne = JSON.parse(JSON.stringify(result.current.cells));
      stepOne[0].entry = 'star';

      act(() => { result.current.setCells(stepOne); });

      expect(result.current.canUndo()).toStrictEqual(true);
    });
    it('should return false once all moves undone', () => {
      const { result } = renderHook(() => useCells(3, 4));
      const stepOne = JSON.parse(JSON.stringify(result.current.cells));
      stepOne[0].entry = 'star';

      act(() => { result.current.setCells(stepOne); });
      act(() => { result.current.undo(); });

      expect(result.current.canUndo()).toStrictEqual(false);
    });
  });
  describe('redo()', () => {
    it('should allow you to redo once', () => {
      const { result } = renderHook(() => useCells(3, 4));
      const stepOne = JSON.parse(JSON.stringify(result.current.cells));
      stepOne[0].entry = 'star';
      const stepTwo = JSON.parse(JSON.stringify(result.current.cells));
      stepTwo[0].entry = 'dot';
      stepTwo[1].entry = 'dot';

      act(() => { result.current.setCells(stepOne); });
      act(() => { result.current.setCells(stepTwo); });

      act(() => { result.current.undo(); });
      act(() => { result.current.redo(); });

      expect(result.current.cells).toStrictEqual(stepTwo);
    });
    it('should allow you to redo twice', () => {
      const { result } = renderHook(() => useCells(3, 4));
      const stepOne = JSON.parse(JSON.stringify(result.current.cells));
      stepOne[0].entry = 'star';
      const stepTwo = JSON.parse(JSON.stringify(result.current.cells));
      stepTwo[0].entry = 'dot';
      stepTwo[1].entry = 'dot';

      act(() => { result.current.setCells(stepOne); });
      act(() => { result.current.setCells(stepTwo); });
      act(() => { result.current.undo(); });
      act(() => { result.current.undo(); });
      act(() => { result.current.redo(); });
      act(() => { result.current.redo(); });

      expect(result.current.cells).toStrictEqual(stepTwo);
    });
    it('should not cause an error when nothing is left to undo', () => {
      const { result } = renderHook(() => useCells(3, 4));
      const stepOne = JSON.parse(JSON.stringify(result.current.cells));
      stepOne[0].entry = 'star';

      act(() => { result.current.setCells(stepOne); });
      act(() => { result.current.undo(); });
      act(() => { result.current.redo(); });
      act(() => { result.current.redo(); });

      expect(result.current.cells).toStrictEqual(stepOne);
    });
    it('should clear the redo queue after new moves', () => {
      const { result } = renderHook(() => useCells(3, 4));
      const stepOne = JSON.parse(JSON.stringify(result.current.cells));
      stepOne[0].entry = 'star';
      const stepTwo = JSON.parse(JSON.stringify(result.current.cells));
      stepTwo[0].entry = 'dot';
      stepTwo[1].entry = 'dot';
      const secondStepTwo = JSON.parse(JSON.stringify(result.current.cells));
      secondStepTwo[2].entry = 'dot';

      act(() => { result.current.setCells(stepOne); });
      act(() => { result.current.setCells(stepTwo); });

      act(() => { result.current.undo(); });
      act(() => { result.current.setCells(secondStepTwo); });
      act(() => { result.current.redo(); });

      expect(result.current.cells).toStrictEqual(secondStepTwo);
    });
  });
  describe('canRedo()', () => {
    it('should return false at first', () => {
      const { result } = renderHook(() => useCells(3, 4));

      expect(result.current.canRedo()).toStrictEqual(false);
    });
    it('should return true when moves to redo', () => {
      const { result } = renderHook(() => useCells(3, 4));
      const stepOne = JSON.parse(JSON.stringify(result.current.cells));
      stepOne[0].entry = 'star';

      act(() => { result.current.setCells(stepOne); });
      act(() => { result.current.undo(); });

      expect(result.current.canRedo()).toStrictEqual(true);
    });
    it('should return false once all moves undone', () => {
      const { result } = renderHook(() => useCells(3, 4));
      const stepOne = JSON.parse(JSON.stringify(result.current.cells));
      stepOne[0].entry = 'star';

      act(() => { result.current.setCells(stepOne); });
      act(() => { result.current.undo(); });
      act(() => { result.current.redo(); });

      expect(result.current.canRedo()).toStrictEqual(false);
    });
  });
});
