import { idToIJ } from './idToIJ.js';

export const INPUT_TO_ENTRY = {
  '1': {'entry': 'star'},
  '2': {'centres': 'star'},
  '3': {'entry': 'dot'}
};

const updateCellEntry = (cells, id, newEntry) => {
  if ('entry' in newEntry) {
    if (cells[id]['entry'] === newEntry['entry']) {
      cells[id]['entry'] = '';
    } else {
      cells[id]['entry'] = newEntry['entry'];
    }
  } else if ('centres' in newEntry) {
    if (cells[id]['centres'].includes(newEntry['centres'])) {
      cells[id]['centres'] = cells[id]['centres'].filter(entry => entry !== newEntry['centres']);
    } else {
      cells[id]['centres'].push(newEntry['centres']);
    }
  }
};

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

export const handleKeyPress = (key, cells, selecteds, checkErrors) => {
  const newCells = [...cells];
  const newEntry = INPUT_TO_ENTRY[key];

  selecteds.forEach((id) => {
    updateCellEntry(newCells, id, newEntry);
  });
  checkErrors(newCells, selecteds);

  return newCells;
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
