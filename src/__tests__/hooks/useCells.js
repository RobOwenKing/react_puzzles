import { renderHook, act } from '@testing-library/react-hooks';

import { useCells } from '../../hooks/useCells.js';

import { createCells } from '../../helpers/create2DArray.js';

describe('useCells', () => {
  describe('cells', () => {
    it('should return the same as createCells() when first called with same values', () => {
      const { result } = renderHook(() => useCells(3, 4));
      const sample = createCells(3, 4);
      expect(result.current.cells).toStrictEqual(sample);
    });
  });
});
