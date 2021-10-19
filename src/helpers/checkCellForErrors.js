/*const ERROR_CHECKERS = {
  'starbattle': parseStarBattle
};

 const puzzleToConstraints = (puzzle, rows, cols, regions, setConstraints) => {
  const newConstraints = [];

  for (const [key, value] of Object.entries(puzzle)) {
    PARSE_PUZZLE[key].call(this, newConstraints, value, rows, cols, regions);
  }

};*/

export const checkCellForErrors = (cell, allCells, constraints, puzzle) => {
  constraints.filter(constraint => constraint.ids.includes(cell))
};
