import React from 'react';

import { Cell } from './cell.jsx';

export const Grid = ({ rows, cols, cells }) => {
  const [cellSize, setCellSize] = React.useState(100);
  const [selecteds, setSelecteds] = React.useState([]);

  const handleCellClick = (i, j) => {
    setSelecteds([[i,j]]);
  };

  return (
    <svg
      version="1.1" xmlns="http://www.w3.org/2000/svg"
      id="grid" role="img"
      viewBox={`-16 -16 ${(cols * cellSize) + 32} ${(rows * cellSize) + 32}`}
    >
      {cells.map((row, j) => {
        return row.map((contents, i) => {
          return (
            <Cell
              key={(j * cols) + i} i={i} j={j}
              cell={contents}
              cellSize={cellSize}
              clickHandler={handleCellClick}
              selected={selecteds.some(cell => cell[0] === i && cell[1] === j)}
            />
          )
        })
      })}
    </svg>
  );
};
