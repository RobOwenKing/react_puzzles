import React from 'react';

import { ReactComponent as Star } from '../svg/star-solid.svg';

export const CellContents = ({ contents, x, y, size }) => {
  let toRender;

  switch (contents) {
    case 'star':
      toRender = <Star x={x} y={y} width={size} height={size} />;
      break;
    case 'dot':
      toRender = <circle cx={x} cy={y} r={size * 0.2} />;
      break;
    case 'red':
      toRender = <rect x={x} y={y} width={size} height={size} style={{fill: 'red'}} />;
      break;
    default:
      return null;
  }

  return toRender;
};
