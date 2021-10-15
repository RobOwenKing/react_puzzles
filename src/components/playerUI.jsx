import React from 'react';

import { useEventListener } from '../hooks/useEventListener.js';

const INPUT_TO_ENTRY = {
  '1': {'entry': 'star'},
  '2': {'centres': 'star'}
};

const updateCellEntry = (cells, i, j, newEntry) => {
  if ('entry' in newEntry) {
    if (cells[j][i] === newEntry['entry']) {
      cells[j][i]['entry'] = '';
    } else {
      cells[j][i]['entry'] = newEntry['entry'];
    }
  } else if ('centres' in newEntry) {
    if (cells[j][i]['centres'].includes(newEntry['entry'])) {
      //cells[j][i]['entry'] = '';
    } else {
      cells[j][i]['centres'].push(newEntry['entry']);
    }
  }
};

export const PlayerUI = ({ selecteds, cells, setCells }) => {
  const inputHandler = (key) => {
    console.log(key);

    if (key in INPUT_TO_ENTRY) {
      const newCells = [...cells];
      const newEntry = INPUT_TO_ENTRY[key];

      selecteds.forEach(([i, j]) => {
        updateCellEntry(newCells, i, j, newEntry);
      });
      setCells(newCells);
    }
  };

  useEventListener('keydown', (e) => { inputHandler(e.key) });

  return (
    <svg></svg>
  );
};
