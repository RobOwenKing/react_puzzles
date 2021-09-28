import React from 'react';

import { Grid } from './grid.jsx';

import { create2DArray } from '../helpers/create_2D_array.js';

const initialCells = (props) => {
  if (props.cells) { return props.cells; }
  if (props.rows && props.cols) { return create2DArray(props.rows, props.cols); }

  throw new Error('<Puzzle> needs either props.cells or props.rows and props.cols');
};

export const Puzzle = (props) => {
  const [cells, setCells] = React.useState(initialCells(props));

  return (
    <div id="puzzle">
      <Grid
        cells={cells}
        rows={cells.length} cols={cells[0].length}
      />
    </div>
  );
};
