export const create2DArray = (rows, cols, fillValue = '.') => {
  const returnable = new Array(rows).fill([]).map(() => []);

  returnable.forEach((row) => {
    for (let i = 0; i < cols; i += 1) {
      row.push(fillValue);
    }
  });

  return returnable;
};

export const createCells = (rows, cols) => {
  const returnable = [];

  for (let j = 0; j < rows; j += 1) {
    for (let i = 0; i < cols; i += 1) {
      returnable.push({
        'id': j * cols + i,
        'i': i,
        'j': j,
        'centres': [],
        'errors': []
      });
    }
  }

  return returnable;
};
