import React from 'react';

import { ReactComponent as Star } from '../svg/star-solid.svg';

export const CellContents = ({ contents, x, y, size }) => {
  let toRender;

  switch (contents) {
    case contents.match(/^hsl/)?.input:
      toRender = <rect x={x - (size/2)} y={y - (size/2)} width={size} height={size} style={{fill: contents}} />;
      break;
    case 'star':
      toRender = <Star x={x} y={y} width={size} height={size} />;
      break;
    case 'dot':
      toRender = <circle cx={x} cy={y} r={size * 0.2} />;
      break;
    default:
      return null;
  }

  return toRender;
};
