const checkSBHouse = (constraint, index, cells, puzzle) => {
  let count = 0;

  constraint.ids.forEach((id) => {
    if (cells[id].entry === 'star') { count += 1; }
  });

  if (count > puzzle.starbattle) {
    constraint.ids.forEach((id) => { cells[id].errors.push(index); })
  } else {
    constraint.ids.forEach((id) => {
      cells[id].errors = cells[id].errors.filter(num => num !== index);
    })
  }
};

const ERROR_CHECKERS = {
  'sb_house': checkSBHouse
};

export const checkCellForErrors = (cell, allCells, constraints, puzzle) => {
  constraints.filter(constraint => constraint.ids.includes(cell))
      .forEach((constraint, index) => {
        ERROR_CHECKERS[constraint.type].call(this, constraint, index, allCells, puzzle);
      })
};
