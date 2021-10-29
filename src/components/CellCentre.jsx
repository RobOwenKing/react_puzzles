import React from 'react';

import { CellContents } from './CellContents.jsx';

export const CellCentre = ({ centres, x, y, cellSize }) => {
  const contents = () => {
    if (Array.isArray(centres)) {
      return centres[0];
    } else {
      return centres;
    }
  }

  return (
    <g>
      <CellContents
          contents={contents()}
          x={x} y={y}
          size={cellSize * 0.2}
          />
    </g>
  );
};
