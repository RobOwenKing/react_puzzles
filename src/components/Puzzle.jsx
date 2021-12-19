import React from 'react';

import { Grid } from './Grid.jsx';
import { PlayerUI } from './PlayerUI.jsx';

import { checkCellForErrors } from '../helpers/checkCellForErrors.js';
import { checkSolveState } from '../helpers/checkSolveState.js';

import { useCells } from '../hooks/useCells.js';

export const Puzzle = (props) => {
  const { cells, setCells, undo, redo } = useCells(props.rows, props.cols);
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
        cells={cells} setCells={setCells} undo={undo} redo={redo}
        rows={props.rows} cols={props.cols}
        inputMaps={props.inputMaps}
        checkErrors={checkErrors}
      />
    </div>
  );
};
