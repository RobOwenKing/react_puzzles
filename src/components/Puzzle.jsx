import React from 'react';

import { Grid } from './Grid.jsx';
import { PlayerUI } from './PlayerUI.jsx';

import { checkCellForErrors } from '../helpers/checkCellForErrors.js';
import { checkSolveState } from '../helpers/checkSolveState.js';
import { createCells } from '../helpers/create2DArray.js';

const initialCells = (props) => {
  if (props.cells) { return props.cells; }
  if (props.rows && props.cols) { return createCells(props.rows, props.cols); }

  throw new Error('<Puzzle> needs either props.cells or props.rows and props.cols');
};

export const Puzzle = (props) => {
  const [cells, setCells] = React.useState(initialCells(props));
  const [selecteds, setSelecteds] = React.useState([]);

  const checkErrors = (allCells, cellsToCheck) => {
    cellsToCheck.forEach((cell) => {
      checkCellForErrors(cell, allCells, props.constraints, props.puzzle);
    });
  };

  React.useEffect(() => {
    checkSolveState(cells, props.puzzle);
  }, [cells, props.puzzle]);

  return (
    <div id="puzzle">
      <Grid
        cells={cells}
        selecteds={selecteds} setSelecteds={setSelecteds}
        rows={props.rows} cols={props.cols}
        constraints={props.constraints}
        regions={props.regions}
      />
      <PlayerUI
        puzzle={props.puzzle}
        selecteds={selecteds} setSelecteds={setSelecteds}
        cells={cells} setCells={setCells}
        rows={props.rows} cols={props.cols}
        checkErrors={checkErrors}
      />
    </div>
  );
};
