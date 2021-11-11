const noActionNecessary = () => {
  return;
};

const parseStarBattleRows = (constraints, count, rows, cols) => {
  for (let j = 0; j < rows; j += 1) {
    const rowConstraint = {
      'type': 'sb_house',
      'id': count.current,
      'ids': []
    }
    for (let i = 0; i < cols; i += 1) {
      rowConstraint.ids.push(j * cols + i);
    }
    constraints.push(rowConstraint);
    count.current += 1;
  }
};

const parseStarBattleCols = (constraints, count, rows, cols) => {
  for (let i = 0; i < cols; i += 1) {
    const colConstraint = {
      'type': 'sb_house',
      'id': count.current,
      'ids': []
    }
    for (let j = 0; j < rows; j += 1) {
      colConstraint.ids.push(j * cols + i);
    }
    constraints.push(colConstraint);
    count.current += 1;
  }
};

const parseStarBattleRegions = (constraints, count, rows, cols, regions) => {
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
    constraints.push({ 'type': 'sb_house', 'id': count.current, 'ids': idsByRegion[key] });
    count.current += 1;
  }
};

const addStarBattleNeighbourhoodCheck = (constraints, count, rows, cols) => {
  constraints.push({ 'type': 'sb_neighbours', 'id': count.current, 'ids': [] });
  count.current += 1;
};

const parseStarBattle = (constraints, count, value, rows, cols, regions) => {
  parseStarBattleRows(constraints, count, rows, cols);
  parseStarBattleCols(constraints, count, rows, cols);
  parseStarBattleRegions(constraints, count, rows, cols, regions);
  addStarBattleNeighbourhoodCheck(constraints, count, rows, cols);

  // console.log(constraints);
};

const PARSE_PUZZLE = {
  'starbattle': parseStarBattle,
  'rows': noActionNecessary,
  'cols': noActionNecessary
};

export const puzzleToConstraints = (puzzle, rows, cols, regions, constraintCount) => {
  const newConstraints = [];

  for (const [key, value] of Object.entries(puzzle)) {
    PARSE_PUZZLE[key].call(this, newConstraints, constraintCount, value, rows, cols, regions);
  }

  return newConstraints;
};
