import React from 'react';

import { Grid } from './grid.jsx';
import { PlayerUI } from './playerUI.jsx';

import { createCells } from '../helpers/create2DArray.js';
import { puzzleToConstraints } from '../helpers/puzzleToConstraints.js';

const initialCells = (props) => {
  if (props.cells) { return props.cells; }
  if (props.rows && props.cols) { return createCells(props.rows, props.cols); }

  throw new Error('<Puzzle> needs either props.cells or props.rows and props.cols');
};

const initialConstraints = (puzzle, rows, cols, regions, setConstraints) => {
  puzzleToConstraints(puzzle, rows, cols, regions, setConstraints);
};

const checkCellForErrors = (cell, allCells) => {
  console.log(cell);
};

export const Puzzle = (props) => {
  const [cells, setCells] = React.useState(initialCells(props));
  const [selecteds, setSelecteds] = React.useState([]);

  React.useEffect(() => {
    initialConstraints(props.puzzle, props.rows, props.cols, props.regions, props.setConstraints);
  }, []);

  const checkErrors = (allCells, cellsToCheck) => {
    cellsToCheck.forEach((cell) => {
      checkCellForErrors(cell, allCells)
    });
  };

  return (
    <div id="puzzle">
      <Grid
        cells={cells}
        selecteds={selecteds} setSelecteds={setSelecteds}
        rows={cells.length} cols={cells[0].length}
        constraints={props.constraints}
        regions={props.regions} setRegions={props.setRegions}
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
