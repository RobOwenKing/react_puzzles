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
  } else if ('colour' in newEntry) {
     if (cells[id]['colour'] === newEntry['colour']) {
      delete cells[id].colour;
    } else {
      cells[id]['colour'] = newEntry['colour'];
    }
  }
};

export const handleKeyPress = (key, cells, selecteds, checkErrors, inputMap) => {
  const newCells = JSON.parse(JSON.stringify(cells));
  const newEntry = inputMap[key];

  selecteds.forEach((id) => {
    updateCellEntry(newCells, id, newEntry);
  });
  checkErrors(newCells, selecteds);

  return newCells;
};

