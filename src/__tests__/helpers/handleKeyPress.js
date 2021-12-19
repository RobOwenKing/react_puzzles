import { handleKeyPress } from '../../helpers/handleKeyPress.js';

import { createCells } from '../../helpers/create2DArray.js';
import { puzzleToInputMaps } from '../../helpers/puzzleToInputMaps.js';

describe('handleKeyPress()', () => {
  let cells = createCells(3, 3);
  const inputMap = puzzleToInputMaps({ 'starbattle': 1 });
  const checkErrors = () => { return true; };

  it('should return an Array of the same length as the passed cells', () => {
    const sample = handleKeyPress('1', cells, [0], checkErrors, inputMap[0]['maps'][0]);
    expect(sample).toBeInstanceOf(Array);
    expect(sample.length).toBe(cells.length);
  });

  it('should add entry correctly when passed one selected cell', () => {
    const sample = handleKeyPress('1', cells, [0], checkErrors, inputMap[0]['maps'][0]);
    cells[0]['entry'] = 'star';
    expect(sample).toStrictEqual(cells);

    cells[0]['entry'] = '';
  });

  it('should add entries correctly when passed multiple selected cells', () => {
    const sample = handleKeyPress('1', cells, [0, 1, 5], checkErrors, inputMap[0]['maps'][0]);
    cells[0]['entry'] = 'star';
    cells[1]['entry'] = 'star';
    cells[5]['entry'] = 'star';
    expect(sample).toStrictEqual(cells);

    cells[0]['entry'] = '';
    cells[1]['entry'] = '';
    cells[5]['entry'] = '';
  });

  it('should remove an entry when user passes same again', () => {
    const temp = handleKeyPress('1', cells, [2], checkErrors, inputMap[0]['maps'][0]);
    const sample = handleKeyPress('1', temp, [2], checkErrors, inputMap[0]['maps'][0]);
    cells[2]['entry'] = '';
    expect(sample).toStrictEqual(cells);
  });
  /**
    * @todo Tests for centres and corners (once implemented fully)
    * @todo Tests for switching mode (eg: colours to numbers to etc)
  */
});
