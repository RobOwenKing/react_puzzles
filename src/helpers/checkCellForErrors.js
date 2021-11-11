import { idToIJ } from './idToIJ.js';

const checkSBHouse = (constraint, _cell, cells, puzzle) => {
  let count = 0;

  constraint.ids.forEach((id) => {
    if (cells[id].entry === 'star') { count += 1; }
  });

  if (count > puzzle.starbattle) {
    constraint.ids.forEach((id) => { cells[id].errors.push(constraint.id); })
  } else {
    constraint.ids.forEach((id) => {
      cells[id].errors = cells[id].errors.filter(num => num !== constraint.id);
    })
  }
};

const checkSBNeighbours = (constraint, cell, cells, puzzle) => {
  const cols = puzzle.cols;
  const neighbours = [cell-cols, cell+cols];

  const i = idToIJ(cell, puzzle.cols)[0];
  if (i !== 0) { neighbours.push(cell-(cols+1), cell-1, cell+(cols-1)); }
  if (i !== puzzle.cols - 1) { neighbours.push(cell-(cols-1), cell+1, cell+(cols+1)); }

  if (cells[cell].entry !== 'star') {
    cells[cell].errors = cells[cell].errors.filter(num => num !== constraint.id);
    neighbours.forEach((neighbour) => {
      if (cells[neighbour] && cells[neighbour].entry === 'star') {
        checkSBNeighbours(constraint, neighbour, cells, puzzle);
      }
    })
  } else {
    let errorCount = 0;

    neighbours.forEach((neighbour) => {
      if (cells[neighbour] && cells[neighbour].entry === 'star') {
        cells[cell].errors.push(constraint.id);
        cells[neighbour].errors.push(constraint.id);
        errorCount += 1;
      }
    })

    if (errorCount === 0) {
      cells[cell].errors = cells[cell].errors.filter(num => num !== constraint.id);
    }
  }
};

const ERROR_CHECKERS = {
  'sb_house': checkSBHouse,
  'sb_neighbours': checkSBNeighbours
};

export const checkCellForErrors = (cell, allCells, constraints, puzzle) => {
  constraints.filter(constraint => constraint.ids.includes(cell) || constraint.ids.length === 0)
      .forEach((constraint) => {
        ERROR_CHECKERS[constraint.type].call(this, constraint, cell, allCells, puzzle);
      })
};
