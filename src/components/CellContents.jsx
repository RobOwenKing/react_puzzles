import React from 'react';

import { ReactComponent as Star } from '../svg/star-solid.svg';

export const CellContents = ({ entry, x, y, size }) => {
  return (
    <g>
      {entry === 'star' &&
        (<Star
            x={x} y={y}
            width={size} height={size}
            />)}
      {entry === 'dot' &&
        (<circle
            cx={x} cy={y} r={size * 0.2}
            />)}
    </g>
  );
};
