import React from 'react';

import { Rules } from './Rules.jsx';
import { UIPanel } from './UIPanel.jsx';

import { handleArrowPress } from '../helpers/handleArrowPress.js';
import { INPUT_TO_ENTRY, handleKeyPress } from '../helpers/handleKeyPress.js';

import { useEventListener } from '../hooks/useEventListener.js';

export const PlayerUI = ({ puzzle, selecteds, setSelecteds, cells, setCells, rows, cols, checkErrors }) => {
  const inputHandler = (key, ctrl, shft) => {
    if (key in INPUT_TO_ENTRY) {
      setCells(handleKeyPress(key, cells, selecteds, checkErrors));
    } else if (['ArrowUp', 'ArrowLeft', 'ArrowDown', 'ArrowRight'].includes(key)) {
      setSelecteds(handleArrowPress(key, ctrl, shft, selecteds, rows, cols));
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
