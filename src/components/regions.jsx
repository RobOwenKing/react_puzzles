import React from 'react';

import { create2DArray } from '../helpers/create_2D_array.js';

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

const setDefaultRegions = (rows, cols) => {
  /**
    @todo Handle case: offset
    @todo Handle case: non-square grid
  */
  if (rows === cols) {
    return setDefaultRegionsSquare(rows, cols);
  }
};

export const Regions = ({ rows, cols, regions, setRegions }) => {
  React.useEffect(() => {
    if (regions.length === 0) {
      setRegions(setDefaultRegions(rows, cols));
    }
  }, [rows, cols, regions, setRegions])

  return (
    <g></g>
  );
};
