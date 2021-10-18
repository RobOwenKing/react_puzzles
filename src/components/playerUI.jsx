import React from 'react';

import { idToIJ } from '../helpers/idToIJ.js';

import { useEventListener } from '../hooks/useEventListener.js';

const INPUT_TO_ENTRY = {
  '1': {'entry': 'star'},
  '2': {'centres': 'star'}
};

const updateCellEntry = (cells, i, j, newEntry) => {
  if ('entry' in newEntry) {
    if (cells[j][i]['entry'] === newEntry['entry']) {
      cells[j][i]['entry'] = '';
    } else {
      cells[j][i]['entry'] = newEntry['entry'];
    }
  } else if ('centres' in newEntry) {
    if (cells[j][i]['centres'].includes(newEntry['centres'])) {
      cells[j][i]['centres'] = cells[j][i]['centres'].filter(entry => entry !== newEntry['centres']);
    } else {
      cells[j][i]['centres'].push(newEntry['centres']);
    }
  }
};

export const PlayerUI = ({ selecteds, cells, setCells, cols, checkErrors }) => {
  const inputHandler = (key) => {
    console.log(key);

    if (key in INPUT_TO_ENTRY) {
      const newCells = [...cells];
      const newEntry = INPUT_TO_ENTRY[key];

      selecteds.forEach((id) => {
        const [i, j] = idToIJ(id, cols);
        updateCellEntry(newCells, i, j, newEntry);
      });
      checkErrors(newCells, selecteds);
      setCells(newCells);
    }
  };

  useEventListener('keydown', (e) => { inputHandler(e.key) });

  return (
    <svg></svg>
  );
};
