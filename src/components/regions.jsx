import React from 'react';

import { create2DArray } from '../helpers/create_2D_array.js';

const setDefaultRegions = (rows, cols) => {
  const new2DArray = create2DArray(rows, cols, 0);

  return new2DArray;
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
