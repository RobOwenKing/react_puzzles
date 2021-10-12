export const create2DArray = (rows, cols, fillValue = {}) => {
  return new Array(rows).fill([]).map(() => new Array(cols).fill(fillValue));
};
