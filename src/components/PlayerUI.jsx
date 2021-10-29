import React from 'react';

import { INPUT_TO_ENTRY, handleKeyPress, handleArrowPress } from '../helpers/handleKeyPress.js';

import { useEventListener } from '../hooks/useEventListener.js';

export const PlayerUI = ({ selecteds, setSelecteds, cells, setCells, rows, cols, checkErrors }) => {
  const inputHandler = (e) => {
    e.preventDefault();
    const key = e.key;

    if (key in INPUT_TO_ENTRY) {
      handleKeyPress(key, cells, selecteds, checkErrors, setCells);
    } else if (['ArrowUp', 'ArrowLeft', 'ArrowDown', 'ArrowRight'].includes(key)) {
      handleArrowPress(e, key, selecteds, setSelecteds, rows, cols);
    }
  };

  useEventListener('keydown', (e) => { inputHandler(e) });

  return (
    <svg></svg>
  );
};
