const parseStarBattle = (constraints, value, rows, cols, regions) => {
  console.log(value);
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
