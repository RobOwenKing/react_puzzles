import React from 'react';

import { useEventListener } from '../hooks/useEventListener.js';

export const PlayerUI = ({ selecteds, cells, setCells }) => {
  const inputHandler = (key) => {
    if (key === '1') {
      const newCells = [...cells];

      selecteds.forEach(([i, j]) => {
        newCells[j][i]['entry'] = 'star'
      });
      setCells(newCells);
    }
  };

  useEventListener('keydown', (e) => { inputHandler(e.key) });

  return (
    <svg></svg>
  );
};
