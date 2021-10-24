import React from 'react';

import { CellContents } from './CellContents.jsx';

export const CellCentre = ({ centres, x, y, cellSize }) => {
  return (
    <g>
      <CellContents
          contents={centres[0]}
          x={x} y={y}
          size={cellSize * 0.2}
          />
    </g>
  );
};
