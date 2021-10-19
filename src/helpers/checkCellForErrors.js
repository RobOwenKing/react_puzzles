import { idToIJ } from './idToIJ.js';

const checkSBHouse = (constraint, cells, puzzle) => {
  let count = 0;

  constraint.ids.forEach((id) => {
    //const [i, j] = idToIJ(id, cols);
  });

  console.log(count > puzzle.starbattle);
};

const ERROR_CHECKERS = {
  'sb_house': checkSBHouse
};

export const checkCellForErrors = (cell, allCells, constraints, puzzle) => {
  constraints.filter(constraint => constraint.ids.includes(cell)).
    forEach((constraint) => {
      //ERROR_CHECKERS[constraint.type].call(this, constraint, allCells, puzzle);
    })
};
