import React from 'react';

import { Grid } from './grid.jsx';
import { PlayerUI } from './playerUI.jsx';

import { createCells } from '../helpers/create2DArray.js';

const initialCells = (props) => {
  if (props.cells) { return props.cells; }
  if (props.rows && props.cols) { return createCells(props.rows, props.cols); }

  throw new Error('<Puzzle> needs either props.cells or props.rows and props.cols');
};

const checkCellForErrors = (cell, allCells, constraints, puzzle) => {
  console.log(cell);
};

export const Puzzle = (props) => {
  const [cells, setCells] = React.useState(initialCells(props));
  const [selecteds, setSelecteds] = React.useState([]);

  const checkErrors = (allCells, cellsToCheck) => {
    cellsToCheck.forEach((cell) => {
      checkCellForErrors(cell, allCells, props.constraints, props.puzzle);
    });
  };

  return (
    <div id="puzzle">
      <Grid
        cells={cells}
        selecteds={selecteds} setSelecteds={setSelecteds}
        rows={cells.length} cols={cells[0].length}
        constraints={props.constraints}
        regions={props.regions}
      />
      <PlayerUI
        selecteds={selecteds}
        cells={cells} setCells={setCells}
        cols={props.cols}
        checkErrors={checkErrors}
      />
    </div>
  );
};
