import React from 'react';

import { ReactComponent as Star } from '../svg/star-solid.svg';

export const CellContents = ({ contents, x, y, size }) => {
  return (
    <>
      {contents === 'star' &&
        (<Star
            x={x} y={y}
            width={size} height={size}
            />)}
      {contents === 'dot' &&
        (<circle
            cx={x} cy={y} r={size * 0.2}
            />)}
    </>
  );
};
