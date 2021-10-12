import React from 'react';

import { ReactComponent as Star } from '../svg/star-solid.svg';

export const Cell = ({ i, j, contents, cellSize, mouseDownHandler, mouseOverHandler, selected }) => {
  const handleMouseDown = (event) => {
    event.preventDefault();
    mouseDownHandler(event, i, j);
  }

  const handleMouseOver = (event) => {
    event.preventDefault();
    mouseOverHandler(i, j);
  }

  return (
    <g>
      {contents?.entry === 'star' &&
        (<Star
          x={(i+0.5) * cellSize} y={(j+0.5) * cellSize}
          width={cellSize * 0.66} height={cellSize * 0.66}
          />)}
      {selected &&
          (<rect
            x={(i * cellSize) + 3} y={(j * cellSize) + 3}
            width={cellSize - 6} height={cellSize - 6}
            className="selected" />)}
      <rect
        x={i * cellSize} y={j * cellSize}
        width={cellSize} height={cellSize}
        onMouseDown={handleMouseDown}
        onMouseOver={handleMouseOver} />
    </g>
  );
};
