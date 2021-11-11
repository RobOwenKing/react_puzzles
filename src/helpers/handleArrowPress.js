import { idToIJ } from './idToIJ.js';

const calculateSelectedCell = (key, selecteds, rows, cols) => {
  const lastAddedID = selecteds[selecteds.length - 1];
  let idToAdd = lastAddedID;
  const [i, j] = idToIJ(lastAddedID, cols);

  if (key === 'ArrowUp') {
    idToAdd += j === 0 ? (rows-1) * cols : -cols;
  } else if (key === 'ArrowDown') {
    idToAdd += j === rows-1 ? (1-rows) * cols : cols;
  } else if (key === 'ArrowLeft') {
    idToAdd += i === 0 ? cols-1 : -1;
  } else if (key === 'ArrowRight') {
    idToAdd += i === cols-1 ? 1-cols : 1;
  }

  return idToAdd;
};

export const handleArrowPress = (key, ctrl, shft, selecteds, rows, cols) => {
  let newSelecteds = [...selecteds];
  const newID = calculateSelectedCell(key, selecteds, rows, cols);

  if (ctrl || shft) {
    newSelecteds.push(newID);
  } else {
    newSelecteds = [newID];
  }

  return newSelecteds;
};
