import React from 'react';

import { CellCentre } from './CellCentre.jsx';
import { CellEntry } from './CellEntry.jsx';

export const Cell = ({ i, j, id, contents, cellSize, mouseDownHandler, mouseOverHandler, selected }) => {
  const handleMouseDown = (event) => {
    event.preventDefault();
    mouseDownHandler(event, id);
  }

  const handleMouseOver = (event) => {
    event.preventDefault();
    mouseOverHandler(id);
  }

  return (
    <g>
      {contents?.entry?.length > 0 &&
        (<CellEntry
            entry={contents.entry}
            errors={contents.errors.length}
            x={(i+0.5) * cellSize} y={(j+0.5) * cellSize}
            cellSize={cellSize} />)}
      {contents?.centres?.length > 0 &&
        (<CellCentre
            centres={contents.centres}
            x={(i+0.5) * cellSize} y={(j+0.5) * cellSize}
            cellSize={cellSize} />)}
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
