import React from 'react';

import { UIPanel } from './UIPanel.jsx';

import { INPUT_TO_ENTRY, handleKeyPress, handleArrowPress } from '../helpers/handleKeyPress.js';

import { useEventListener } from '../hooks/useEventListener.js';

export const PlayerUI = ({ selecteds, setSelecteds, cells, setCells, rows, cols, checkErrors }) => {
  const inputHandler = (key, ctrl, shft) => {
    if (key in INPUT_TO_ENTRY) {
      handleKeyPress(key, cells, selecteds, checkErrors, setCells);
    } else if (['ArrowUp', 'ArrowLeft', 'ArrowDown', 'ArrowRight'].includes(key)) {
      handleArrowPress(key, ctrl, shft, selecteds, setSelecteds, rows, cols);
    }
  };

  useEventListener('keydown', (e) => {
    e.preventDefault();
    inputHandler(e.key, e.ctrlKey, e.shiftKey)
  });

  return (
    <svg
      version="1.1" xmlns="http://www.w3.org/2000/svg"
      id="input-panel" role="img"
      viewBox="-16 -16 332 332"
    >
      <UIPanel
        inputHandler={inputHandler}
        inputMap={INPUT_TO_ENTRY}
      />
    </svg>
  );
};
