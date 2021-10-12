import React from 'react';

import { useEventListener } from '../hooks/useEventListener.js';

export const PlayerUI = ({ selecteds, cells, setCells }) => {
  const handleInput = (e) => {
    if (e.key === '1') {
      const newCells = [...cells];

      selecteds.forEach(([i, j]) => {
        newCells[j][i]['entry'] = 'star'
      });
      setCells(newCells);
    }
  };

  useEventListener('keydown', (e) => { handleInput(e) });

  return (
    <svg></svg>
  );
};
