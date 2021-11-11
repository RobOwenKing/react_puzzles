import { puzzleToConstraints } from '../../helpers/puzzleToConstraints.js';

import { setDefaultRegions } from '../../helpers/setDefaultRegions.js';

/**
  * Only for high-level tests of puzzleToConstraints()
  * Tests of specific outputs should go in ../puzzle_types or ../constraints
*/
describe('puzzleToConstraints()', () => {
  it('should return an Array', () => {
    const samplePuzzle = { 'starbattle': 1 };
    const sampleRegions = setDefaultRegions(3, 3);
    const sampleCount = { 'current': 0 };
    const sample = puzzleToConstraints(samplePuzzle, 3, 3, sampleRegions, sampleCount);
    expect(sample).toBeInstanceOf(Array);
  });
  it('should give each object in the returned array a unique id', () => {
    const samplePuzzle = { 'starbattle': 1 };
    const sampleRegions = setDefaultRegions(3, 3);
    const sampleCount = { 'current': 0 };
    const sample = puzzleToConstraints(samplePuzzle, 3, 3, sampleRegions, sampleCount);
    const uniqueIDs = sample.map(element => element.id)
        .filter((element, index, self) => { return self.indexOf(element) === index });
    expect(sample.length).toBe(uniqueIDs.length);
  });
});
