import { useCells } from '../../hooks/useCells.js';

import { createCells } from '../../helpers/create2DArray.js';

describe('cells', () => {
  it('should return the same as createCells() when first called with same values', () => {
    const [cells, ...rest] = useCells(3, 4);
    const sample = createCells(3, 4);
    expect(cells).toStrictEqual(sample);
  });
});
