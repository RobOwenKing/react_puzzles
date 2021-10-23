import React from 'react';

import { ReactComponent as Star } from '../svg/star-solid.svg';

export const CellEntry = ({ entry, errors, x, y, width, height }) => {
  return (
    <g className={errors > 0 ? 'error' : undefined}>
      {entry === 'star' &&
        (<Star
          x={x} y={y}
          width={width} height={height}
          />)}
    </g>
  );
};
