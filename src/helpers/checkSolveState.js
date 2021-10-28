const countSymbol = (cells, symbol) => {
  let count = 0;

  cells.forEach((cell) => {
    count += cell.entry === symbol ? 1 : 0;
  });

  return count;
};

const checkSB = (cells, puzzle) => {
  if (countSymbol(cells, 'star') !== puzzle.cols * puzzle.starbattle) { return false; }

  return true;
};

const CHECK_FUNCTIONS = {
  'starbattle': checkSB
};

const isPuzzleSolved = (cells, puzzle) => {
  if (cells.some((cell) => {return cell.errors.length > 0})) { return false; }

  for (const key of Object.keys(puzzle)) {
    if (CHECK_FUNCTIONS[key] && !CHECK_FUNCTIONS[key].call(this, cells, puzzle)) { return false; }
  }

  return true;
};

export const checkSolveState = (cells, puzzle) => {
  if (isPuzzleSolved(cells, puzzle)) {
    console.log('solved');
  }
};
