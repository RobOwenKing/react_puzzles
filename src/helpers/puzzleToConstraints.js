const parseStarBattleRows = (constraints, rows, cols) => {
  for (let j = 0; j < rows; j += 1) {
    const rowConstraint = {
      'type': 'sb_house',
      'ids': [],
      'errors': []
    }
    for (let i = 0; i < cols; i += 1) {
      rowConstraint.ids.push(j * cols + i);
    }
    constraints.push(rowConstraint);
  }
};

const parseStarBattleCols = (constraints, rows, cols) => {
  for (let i = 0; i < cols; i += 1) {
    const colConstraint = {
      'type': 'sb_house',
      'ids': [],
      'errors': []
    }
    for (let j = 0; j < rows; j += 1) {
      colConstraint.ids.push(j * cols + i);
    }
    constraints.push(colConstraint);
  }
};

const parseStarBattle = (constraints, value, rows, cols, regions) => {
  parseStarBattleRows(constraints, rows, cols);
  parseStarBattleCols(constraints, rows, cols);

  console.log(constraints);
};

const PARSE_PUZZLE = {
  'starbattle': parseStarBattle
};

export const puzzleToConstraints = (puzzle, rows, cols, regions, setConstraints) => {
  const newConstraints = [];

  for (const [key, value] of Object.entries(puzzle)) {
    PARSE_PUZZLE[key].call(this, newConstraints, value, rows, cols, regions);
  }

  //setConstraints(newConstraints);
};
