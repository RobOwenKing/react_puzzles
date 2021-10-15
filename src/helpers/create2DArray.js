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
  const template = create2DArray(rows, cols);

  const returnable = template.map((row) => {
    return row.map((element) => {
      return { centres: [] };
    })
  });

  return returnable;
};
