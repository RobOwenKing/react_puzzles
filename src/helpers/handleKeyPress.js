export const INPUT_TO_ENTRY = {
  '1': {'entry': 'star'},
  '2': {'centres': 'star'},
  '3': {'entry': 'dot'},
  '4': {'colour': 'hsl(0 67% 67%)'},
  '5': {'centres': 'hsl(40 67% 67%)'},
  '6': {'centres': 'hsl(80 67% 67%)'},
  '7': {'centres': 'hsl(120 67% 67%)'},
  '8': {'colour': 'hsl(160 67% 67%)'},
  '9': {'colour': 'hsl(200 67% 67%)'}
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
  } else if ('colour' in newEntry) {
     if (cells[id]['colour'] === newEntry['colour']) {
      delete cells[id].colour;
    } else {
      cells[id]['colour'] = newEntry['colour'];
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

