import React from 'react';

import { CellContents } from './CellContents.jsx';

export const CellEntry = ({ entry, errors, x, y, cellSize }) => {
  return (
    <g className={errors > 0 ? 'error' : undefined}>
      <CellContents
          entry={entry}
          x={x} y={y}
          size={cellSize * 0.66}
          />
    </g>
  );
};
