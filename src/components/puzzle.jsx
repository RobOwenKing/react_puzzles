import React from 'react';

const fillGrid = (rows, cols) => {
  return new Array(rows).fill([]).map(() => new Array(cols).fill({}));
};

const initialCells = (props) => {
  if (props.cells) { return props.cells; }
  if (props.rows && props.cols) { return fillGrid(props.rows, props.cols); }

  throw new Error('<Puzzle> needs either props.cells or props.rows and props.cols');
};

export const Puzzle = (props) => {
  const [cells, setCells] = React.useState(initialCells(props));

  return (
    <div id="puzzle">
      <Grid cells={cells} />
    </div>
  );
};
