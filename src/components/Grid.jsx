import React from 'react';

import { Cell } from './Cell.jsx';
import { Regions } from './Regions.jsx';

const setCellAsSelected = (id, selecteds, setSelecteds) => {
  setSelecteds([id]);
};

const pushCellToSelecteds = (id, selecteds, setSelecteds) => {
  setSelecteds([...selecteds, id]);
};

const addDeselectListener = (setSelecteds) => {
  const puzzle = document.getElementById('puzzle');

  puzzle.addEventListener('click', (event) => {
      if (event.target === puzzle) {
        setSelecteds([]);
      }
    })
};

export const Grid = ({ rows, cols, cells, selecteds, setSelecteds, constraints, regions, setRegions }) => {
  const cellSize = 100;
  const [multiSelect, setMultiSelect] = React.useState(false);

  const handleCellMouseDown = (event, id) => {
    if (event.ctrlKey || event.shiftKey) {
      pushCellToSelecteds(id, selecteds, setSelecteds);
    } else {
      setCellAsSelected(id, selecteds, setSelecteds);
    }
    setMultiSelect(true);
  };

  const handleCellMouseOver = (id) => {
    if (multiSelect) {
      pushCellToSelecteds(id, selecteds, setSelecteds);
    }
  };

  const mouseUpHandler = (event) => {
    event.preventDefault();
    setMultiSelect(false);
  };

  React.useEffect(() => {
    addDeselectListener(setSelecteds);
  }, [setSelecteds]);

  return (
    <svg
      version="1.1" xmlns="http://www.w3.org/2000/svg"
      id="grid" role="img"
      viewBox={`-16 -16 ${(cols * cellSize) + 32} ${(rows * cellSize) + 32}`}
    >
      <g id="backgrounds">
        {cells.map((cell, index) => {
          if (!cell.colour) {
            return '';
          } else {
            return (
              <rect
                  key={index}
                  x={cell.i * cellSize} y={cell.j * cellSize}
                  width={cellSize} height={cellSize}
                  style={{fill: cell.colour}}
              />
            );
          }
        })}
      </g>
      { regions.length > 1 &&
          <Regions
              rows={rows} cols={cols}
              regions={regions}
              cellSize={cellSize}
          /> }
      <g id="cells" onMouseUp={mouseUpHandler}>
        {cells.map((cell) => {
          return (
            <Cell
                key={cell.id} id={cell.id}
                contents={cell} className="cell"
                i={cell.i} j={cell.j} cellSize={cellSize}
                mouseDownHandler={handleCellMouseDown}
                mouseOverHandler={handleCellMouseOver}
                selected={selecteds.includes(cell.id)}
            />
          )
        })}
      </g>
    </svg>
  );
};
