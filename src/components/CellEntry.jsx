import React from 'react';

import { CellContents } from './CellContents.jsx';

export const CellEntry = ({ entry, isError, x, y, cellSize }) => {
  return (
    <g className={isError ? 'error' : undefined}>
      <CellContents
          contents={entry}
          x={x} y={y}
          size={cellSize * 0.66}
          />
    </g>
  );
};
