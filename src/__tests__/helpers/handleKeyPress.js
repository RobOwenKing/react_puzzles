import { handleKeyPress } from '../../helpers/handleKeyPress.js';

import { createCells } from '../../helpers/create2DArray.js';

describe('handleKeyPress()', () => {
  let cells = createCells(3, 3);
  const checkErrors = () => { return true; };
  it('should return an Array of the same length as the passed cells', () => {
    const sample = handleKeyPress('1', cells, [0], checkErrors);
    expect(sample).toBeInstanceOf(Array);
    expect(sample.length).toBe(cells.length);
  });
});
