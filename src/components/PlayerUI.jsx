import React from 'react';

import { Rules } from './Rules.jsx';
import { UIPanel } from './UIPanel.jsx';

import { handleArrowPress } from '../helpers/handleArrowPress.js';
import { handleKeyPress } from '../helpers/handleKeyPress.js';

import { useEventListener } from '../hooks/useEventListener.js';

export const PlayerUI = ({ puzzle, selecteds, setSelecteds, cells, setCells, undo, redo, rows, cols, inputMaps, checkErrors }) => {
  const [inputSet, setInputSet] = React.useState(0);

  const inputHandler = (key, ctrl, shft) => {
    if (key in inputMaps[inputSet]) {
      setCells(handleKeyPress(key, cells, selecteds, checkErrors, inputMaps[inputSet]));
    } else if (['ArrowUp', 'ArrowLeft', 'ArrowDown', 'ArrowRight'].includes(key)) {
      setSelecteds(handleArrowPress(key, ctrl, shft, selecteds, rows, cols));
    }
  };

  useEventListener('keydown', (e) => {
    e.preventDefault();
    inputHandler(e.key, e.ctrlKey, e.shiftKey);
  });

  return (
    <div>
      <Rules puzzle={puzzle} />
      <UIPanel
        inputHandler={inputHandler}
        inputMap={inputMaps[inputSet]}
        undo={undo} redo={redo}
      />
    </div>
  );
};
