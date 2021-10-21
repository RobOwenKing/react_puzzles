const parseStarBattleRows = (constraints, rows, cols) => {
  for (let j = 0; j < rows; j += 1) {
    const rowConstraint = {
      'type': 'sb_house',
      'ids': []
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
      'ids': []
    }
    for (let j = 0; j < rows; j += 1) {
      colConstraint.ids.push(j * cols + i);
    }
    constraints.push(colConstraint);
  }
};

const parseStarBattleRegions = (constraints, rows, cols, regions) => {
  const idsByRegion = {};

  for (let j = 0; j < rows; j += 1) {
    for (let i = 0; i < rows; i += 1) {
      const region = regions[j][i];
      if (idsByRegion[region]) {
        idsByRegion[region].push(j * cols + i);
      } else {
        idsByRegion[region] = [j * cols + i];
      }
    }
  }

  for (const key in idsByRegion) {
    constraints.push({ 'type': 'sb_house', 'ids': idsByRegion[key] });
  }
};

const addStarBattleNeighbourhoodCheck = (constraints, rows, cols) => {
  constraints.push({ 'type': 'sb_neighbours', 'ids': [] });
};

const parseStarBattle = (constraints, value, rows, cols, regions) => {
  parseStarBattleRows(constraints, rows, cols);
  parseStarBattleCols(constraints, rows, cols);
  parseStarBattleRegions(constraints, rows, cols, regions);
  addStarBattleNeighbourhoodCheck(constraints, rows, cols);

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

  setConstraints(newConstraints);
};
