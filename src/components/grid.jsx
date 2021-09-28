import React from 'react';

import { Cell } from './cell.jsx';

import { create2DArray } from '../helpers/create_2D_array.js';

const updateIsSelected = (oldSelecteds, newSelecteds, isSelected, setIsSelected) => {
  const newIsSelected = [...isSelected];
  oldSelecteds.forEach(([i, j]) => {newIsSelected[j][i] = false});
  newSelecteds.forEach(([i, j]) => {newIsSelected[j][i] = true});
  setIsSelected(newIsSelected);
};

const setCellAsSelected = (i, j, selecteds, setSelecteds, isSelected, setIsSelected) => {
  const newSelecteds = [[i, j]];
  setSelecteds(newSelecteds);
  updateIsSelected(selecteds, newSelecteds, isSelected, setIsSelected);
};

const pushCellToSelecteds = (i, j, selecteds, setSelecteds, isSelected, setIsSelected) => {
  const newSelecteds = [...selecteds];
  newSelecteds.push([i, j]);
  setSelecteds(newSelecteds);
  updateIsSelected(selecteds, newSelecteds, isSelected, setIsSelected);
};

export const Grid = ({ rows, cols, cells }) => {
  const [cellSize, setCellSize] = React.useState(100);
  const [selecteds, setSelecteds] = React.useState([]);
  const [isSelected, setIsSelected] = React.useState(create2DArray(rows, cols, false));
  const [multiSelect, setMultiSelect] = React.useState(false);

  const handleCellMouseDown = (i, j) => {
    setCellAsSelected(i, j, selecteds, setSelecteds, isSelected, setIsSelected);
    setMultiSelect(true);
  };

  const handleCellMouseOver = (i, j) => {
    if (multiSelect) {
      pushCellToSelecteds(i, j, selecteds, setSelecteds, isSelected, setIsSelected);
    }
  };

  const mouseUpHandler = (event) => {
    event.preventDefault();
    setMultiSelect(false);
  }

  return (
    <svg
      version="1.1" xmlns="http://www.w3.org/2000/svg"
      id="grid" role="img"
      viewBox={`-16 -16 ${(cols * cellSize) + 32} ${(rows * cellSize) + 32}`}
    >
      <g onMouseUp={mouseUpHandler}>
        {cells.map((row, j) => {
          return row.map((contents, i) => {
            return (
              <Cell
                key={`${i}-${j}`} i={i} j={j}
                cell={contents}
                cellSize={cellSize}
                mouseDownHandler={handleCellMouseDown}
                mouseOverHandler={handleCellMouseOver}
                selected={isSelected[j][i]}
              />
            )
          })
        })}
      </g>
    </svg>
  );
};
