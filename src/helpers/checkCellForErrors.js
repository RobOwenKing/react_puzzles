const checkSBHouse = (constraint, index, _cell, cells, puzzle) => {
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

const checkSBNeighbours = (_constraint, index, cell, cells, puzzle) => {
  const cols = puzzle.cols;
  const neighbours = [cell-(cols+1), cell-cols, cell-(cols-1), cell-1, cell+1, cell+(cols-1), cell+cols, cell+(cols+1)];

  console.log(neighbours);

  if (cells[cell].entry !== 'star') {
    cells[cell].errors.filter(num => num !== index);
    neighbours.forEach((neighbour) => {
      if (cells[neighbour] && cells[neighbour].entry === 'star') {
        checkSBNeighbours(_constraint, index, neighbour, cells, puzzle);
      }
    })
  } else {
    let errorCount = 0;

    neighbours.forEach((neighbour) => {
      if (cells[neighbour] && cells[neighbour].entry === 'star') {
        cells[cell].errors.push(index);
        cells[neighbour].errors.push(index);
        errorCount += 1;
      }
    })

    if (errorCount === 0) { cells[cell].errors.filter(num => num !== index); }
  }
};

const ERROR_CHECKERS = {
  'sb_house': checkSBHouse,
  'sb_neighbours': checkSBNeighbours
};

export const checkCellForErrors = (cell, allCells, constraints, puzzle) => {
  constraints.filter(constraint => constraint.ids.includes(cell) || constraint.ids.length === 0)
      .forEach((constraint, index) => {
        ERROR_CHECKERS[constraint.type].call(this, constraint, index, cell, allCells, puzzle);
      })
};
