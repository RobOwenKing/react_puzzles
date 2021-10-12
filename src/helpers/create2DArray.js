export const create2DArray = (rows, cols, fillValue = 'object') => {
  const returnable = new Array(rows).fill([]).map(() => []);

  returnable.forEach((row) => {
    for (let i = 0; i < cols; i += 1) {
      const pushable = fillValue === 'object' ? {} : fillValue;
      row.push(pushable);
    }
  });

  return returnable;
};
