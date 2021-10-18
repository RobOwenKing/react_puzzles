import React from 'react';

import { Cell } from './cell.jsx';
import { Regions } from './regions.jsx';

import { create2DArray } from '../helpers/create2DArray.js';

const setCellAsSelected = (id, selecteds, setSelecteds) => {
  setSelecteds([id]);
};

const pushCellToSelecteds = (id, selecteds, setSelecteds) => {
  setSelecteds([...selecteds, id]);
};

export const Grid = ({ rows, cols, cells, selecteds, setSelecteds, constraints, regions, setRegions }) => {
  const [cellSize, setCellSize] = React.useState(100);
  const [isSelected, setIsSelected] = React.useState(create2DArray(rows, cols, false));
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

  return (
    <svg
      version="1.1" xmlns="http://www.w3.org/2000/svg"
      id="grid" role="img"
      viewBox={`-16 -16 ${(cols * cellSize) + 32} ${(rows * cellSize) + 32}`}
    >
      { constraints.regions &&
            <Regions
              rows={rows} cols={cols}
              regions={regions} setRegions={setRegions}
              cellSize={cellSize}
            /> }
      <g id="cells" onMouseUp={mouseUpHandler}>
        {cells.map((row, j) => {
          return row.map((contents, i) => {
            return (
              <Cell
                key={contents.id} id={contents.id}
                contents={contents}
                i={i} j={j} cellSize={cellSize}
                mouseDownHandler={handleCellMouseDown}
                mouseOverHandler={handleCellMouseOver}
                selected={selecteds.includes(contents.id)}
              />
            )
          })
        })}
      </g>
    </svg>
  );
};
