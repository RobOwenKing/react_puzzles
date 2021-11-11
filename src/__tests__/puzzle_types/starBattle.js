import { checkCellForErrors } from '../../helpers/checkCellForErrors.js';
import { createCells } from '../../helpers/create2DArray.js';
import { isPuzzleSolved } from '../../helpers/checkSolveState.js';
import { puzzleToConstraints } from '../../helpers/puzzleToConstraints.js';
import { setDefaultRegions } from '../../helpers/setDefaultRegions.js';

describe('Puzzle type: Star Battle', () => {
  describe('puzzleToConstraints()', () => {
    it('should have right number of constraints', () => {
      const samplePuzzle = { 'starbattle': 1 };
      const rows = 3;
      const sampleRegions = setDefaultRegions(rows, rows);
      const sampleCount = { 'current': 0 };
      const sample = puzzleToConstraints(samplePuzzle, rows, rows, sampleRegions, sampleCount);
      expect(sample.length).toBe((3 * rows) + 1);
    });
  });

  describe('checkCellForErrors', () => {
    const rows = 6;
    const samplePuzzle = { 'starbattle': 1, 'rows': rows, 'cols': rows };
    const sampleRegions = setDefaultRegions(rows, rows);
    const sampleCount = { 'current': 0 };
    const constraints = puzzleToConstraints(samplePuzzle, rows, rows, sampleRegions, sampleCount);
    const cells = createCells(rows, rows);
    cells[0]['entry'] = 'star';

    it('should find an error when too many stars are in a row', () => {
      cells[3]['entry'] = 'star';
      checkCellForErrors(3, cells, constraints, samplePuzzle);
      expect(cells[3]['errors'].length > 0).toBeTruthy();
    });
    it('should add errors to affected cells other than the one passed to checkCellForErrors()', () => {
      expect(cells[0]['errors'].length > 0).toBeTruthy();
    });
    it('should remove errors when an affected cell changes', () => {
      cells[0]['entry'] = '';
      checkCellForErrors(0, cells, constraints, samplePuzzle);
      expect(cells[0]['errors'].length === 0).toBeTruthy();
    });
    it('should remove errors from affected cells other than the one passed to checkCellForErrors()', () => {
      expect(cells[3]['errors'].length === 0).toBeTruthy();
    });
    it('should find an error when too many stars are in a column', () => {
      cells[15]['entry'] = 'star';
      checkCellForErrors(15, cells, constraints, samplePuzzle);
      expect(cells[0]['errors'].length === 0).toBeTruthy();

      cells[15]['entry'] = '';
      checkCellForErrors(15, cells, constraints, samplePuzzle);
    });
    it('should find an error when too many stars are in a region', () => {
      cells[11]['entry'] = 'star';
      checkCellForErrors(11, cells, constraints, samplePuzzle);
      expect(cells[0]['errors'].length === 0).toBeTruthy();

      cells[3]['entry'] = '';
      checkCellForErrors(3, cells, constraints, samplePuzzle);
    });
    it('should not find a neighbourhood error wrapping around', () => {
      // In naive versions of the check, looking at cell with id
      // givenID +/- 1 broke at the ends of lines
      cells[12]['entry'] = 'star';
      checkCellForErrors(12, cells, constraints, samplePuzzle);
      expect(cells[11]['errors'].length === 0).toBeTruthy();
      expect(cells[12]['errors'].length === 0).toBeTruthy();

      cells[11]['entry'] = '';
      cells[12]['entry'] = '';
      checkCellForErrors(11, cells, constraints, samplePuzzle);
    });
    it('should find neighbourhood errors', () => {
      cells[3]['entry'] = 'star';
      cells[8]['entry'] = 'star';
      checkCellForErrors(3, cells, constraints, samplePuzzle);
      expect(cells[3]['errors'].length > 0).toBeTruthy();
      expect(cells[8]['errors'].length > 0).toBeTruthy();

      cells[3]['entry'] = '';
      cells[8]['entry'] = '';
      checkCellForErrors(3, cells, constraints, samplePuzzle);
    });
    it('should work for more than 1 star', () => {
      samplePuzzle['starbattle'] = 2;

      cells[0]['entry'] = 'star';
      cells[2]['entry'] = 'star';
      checkCellForErrors(2, cells, constraints, samplePuzzle);
      expect(cells[0]['errors'].length === 0).toBeTruthy();
      expect(cells[2]['errors'].length === 0).toBeTruthy();

      cells[5]['entry'] = 'star';
      checkCellForErrors(5, cells, constraints, samplePuzzle);
      expect(cells[0]['errors'].length > 0).toBeTruthy();
      expect(cells[5]['errors'].length > 0).toBeTruthy();
    });
  });

  describe('isPuzzleSolved()', () => {
    const rows = 6;
    const samplePuzzle = { 'starbattle': 1, 'rows': rows, 'cols': rows };
    const sampleRegions = setDefaultRegions(rows, rows);
    const sampleCount = { 'current': 0 };
    const constraints = puzzleToConstraints(samplePuzzle, rows, rows, sampleRegions, sampleCount);
    const cells = createCells(rows, rows);

    it('should return false when not enough stars', () => {
      cells[2]['entry'] = 'star';
      cells[11]['entry'] = 'star';
      cells[13]['entry'] = 'star';
      cells[22]['entry'] = 'star';
      cells[24]['entry'] = 'star';
      checkCellForErrors(2, cells, constraints, samplePuzzle);
      checkCellForErrors(11, cells, constraints, samplePuzzle);
      checkCellForErrors(13, cells, constraints, samplePuzzle);
      checkCellForErrors(22, cells, constraints, samplePuzzle);
      checkCellForErrors(24, cells, constraints, samplePuzzle);
      expect(isPuzzleSolved(cells, samplePuzzle)).toBeFalsy();
    });
    it('should return true for a correct solution', () => {
      cells[33]['entry'] = 'star';
      checkCellForErrors(33, cells, constraints, samplePuzzle);
      expect(isPuzzleSolved(cells, samplePuzzle)).toBeTruthy();

      cells[33]['entry'] = '';
      checkCellForErrors(33, cells, constraints, samplePuzzle);
    });
    it('should return false when enough stars but errors exist', () => {
      cells[34]['entry'] = 'star';
      checkCellForErrors(34, cells, constraints, samplePuzzle);
      expect(isPuzzleSolved(cells, samplePuzzle)).toBeFalsy();

      cells[34]['entry'] = '';
      checkCellForErrors(34, cells, constraints, samplePuzzle);
    });
    it('should return false for a correct solution plus extra wrong stars', () => {
      cells[33]['entry'] = 'star';
      cells[35]['entry'] = 'star';
      checkCellForErrors(33, cells, constraints, samplePuzzle);
      checkCellForErrors(35, cells, constraints, samplePuzzle);
      expect(isPuzzleSolved(cells, samplePuzzle)).toBeFalsy();
    });
  });
});
