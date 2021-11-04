import React from 'react';

import { Rules } from './Rules.jsx';
import { UIPanel } from './UIPanel.jsx';

import { INPUT_TO_ENTRY, handleKeyPress, handleArrowPress } from '../helpers/handleKeyPress.js';

import { useEventListener } from '../hooks/useEventListener.js';

export const PlayerUI = ({ puzzle, selecteds, setSelecteds, cells, setCells, rows, cols, checkErrors }) => {
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
    <div>
      <Rules puzzle={puzzle} />
      <UIPanel
        inputHandler={inputHandler}
        inputMap={INPUT_TO_ENTRY}
      />
    </div>
  );
};
