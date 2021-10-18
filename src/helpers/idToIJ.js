export const idToIJ = (id, cols) => {
  const i = id % cols;
  const j = Math.floor(id / cols);
  return [i, j];
};
