import { idToIJ } from './idToIJ.js';

const checkSBHouse = (constraint, cells, puzzle) => {
  let count = 0;

  constraint.ids.forEach((id) => {
    if (cells[id].entry === 'star') { count += 1; }
  });

  console.log(count > puzzle.starbattle)
};

const ERROR_CHECKERS = {
  'sb_house': checkSBHouse
};

export const checkCellForErrors = (cell, allCells, constraints, puzzle) => {
  constraints.filter(constraint => constraint.ids.includes(cell))
      .forEach((constraint) => {
        ERROR_CHECKERS[constraint.type].call(this, constraint, allCells, puzzle);
      })
};
