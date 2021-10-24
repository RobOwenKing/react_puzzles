import React from 'react';

import { ReactComponent as Star } from '../svg/star-solid.svg';

export const CellEntry = ({ entry, errors, x, y, cellSize }) => {
  return (
    <g className={errors > 0 ? 'error' : undefined}>
      {entry === 'star' &&
        (<Star
          x={x} y={y}
          width={cellSize * 0.66} height={cellSize * 0.66}
          />)}
      {entry === 'dot' &&
        (<circle
          cx={x} cy={y} r={cellSize * 0.1}
          />)}
    </g>
  );
};
