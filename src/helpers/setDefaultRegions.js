import { create2DArray } from './create2DArray.js';

const calculateDefaultCageWidth = (cols) => {
  let testValue = Math.ceil(Math.sqrt(cols));

  while (cols % testValue !== 0) { testValue += 1; }

  return testValue;
};

const setDefaultRegionsSquare = (rows, cols) => {
  const new2DArray = create2DArray(rows, cols, -1);

  const cageWidth = calculateDefaultCageWidth(cols);
  const cageHeight = rows / cageWidth;
  const cagesPerRow = cols / cageWidth;

  for (let j = 0; j < rows; j += 1) {
    for (let i = 0; i < cols; i += 1) {
      new2DArray[j][i] = Math.floor(i / cageWidth) + (Math.floor(j / cageHeight) * cagesPerRow);
    }
  }

  return new2DArray;
};

export const setDefaultRegions = (rows, cols) => {
  /**
    @todo Handle case: offset
    @todo Handle case: non-square grid
  */
  if (rows === cols) {
    return setDefaultRegionsSquare(rows, cols);
  }
};
