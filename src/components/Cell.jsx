import React from 'react';

import { CellCentre } from './CellCentre.jsx';
import { CellEntry } from './CellEntry.jsx';

export const Cell = ({ i, j, id, contents, className, cellSize, mouseDownHandler, mouseOverHandler, selected }) => {
  const handleMouseDown = (event) => {
    event.preventDefault();
    mouseDownHandler(event, id);
  };

  const handleMouseOver = (event) => {
    event.preventDefault();
    mouseOverHandler(id);
  };

  const formatContents = () => {
    if (contents?.entry?.length > 0) {
      return (<CellEntry
                entry={contents.entry}
                isError={contents?.errors && contents.errors?.length > 0}
                x={(i+0.5) * cellSize} y={(j+0.5) * cellSize}
                cellSize={cellSize} />);
    } else {
      if (contents?.centres?.length > 0) {
        return (<CellCentre
            centres={contents.centres}
            x={(i+0.5) * cellSize} y={(j+0.5) * cellSize}
            cellSize={cellSize} />);
      }
    }
  };

  return (
    <>
      {formatContents()}
      {selected &&
          (<rect
              x={(i * cellSize) + 3} y={(j * cellSize) + 3}
              width={cellSize - 6} height={cellSize - 6}
              className="selected" />)}
      <rect
          x={i * cellSize} y={j * cellSize}
          width={cellSize} height={cellSize}
          className={className}
          onMouseDown={handleMouseDown}
          onMouseOver={handleMouseOver} />
    </>
  );
};
