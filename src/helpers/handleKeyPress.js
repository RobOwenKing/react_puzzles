export const INPUT_TO_ENTRY = {
  '1': {'entry': 'star'},
  '2': {'centres': 'star'},
  '3': {'entry': 'dot'},
  '4': {'centres': 'red'}
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

export const handleKeyPress = (key, cells, selecteds, checkErrors) => {
  const newCells = JSON.parse(JSON.stringify(cells));
  const newEntry = INPUT_TO_ENTRY[key];

  selecteds.forEach((id) => {
    updateCellEntry(newCells, id, newEntry);
  });
  checkErrors(newCells, selecteds);

  return newCells;
};

