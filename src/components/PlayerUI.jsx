import React from 'react';

import { Rules } from './Rules.jsx';
import { UIPanel } from './UIPanel.jsx';

import { handleArrowPress } from '../helpers/handleArrowPress.js';
import { handleKeyPress } from '../helpers/handleKeyPress.js';

import { useEventListener } from '../hooks/useEventListener.js';

export const PlayerUI = ({ puzzle, selecteds, setSelecteds, cells, setCells, undo, redo, rows, cols, inputMaps, checkErrors }) => {
  const [inputSet, setInputSet] = React.useState(0);
  const [inputMode, setInputMode] = React.useState(0);

  const inputHandler = (key, ctrl, shft) => {
    const setKeys = ['a', 's', 'd', 'f'];
    const modeKeys = ['z', 'x', 'c', 'v'];

    if (key in inputMaps[inputSet]['maps'][inputMode]) {
      setCells(handleKeyPress(key, cells, selecteds, checkErrors, inputMaps[inputSet]['maps'][inputMode]));
    } else if (['ArrowUp', 'ArrowLeft', 'ArrowDown', 'ArrowRight'].includes(key)) {
      setSelecteds(handleArrowPress(key, ctrl, shft, selecteds, rows, cols));
    } else if (setKeys.includes(key)) {
      const newInputSet = setKeys.findIndex(element => element === key);
      if (inputMaps[newInputSet]) {
        if (!inputMaps[newInputSet]['maps'][inputMode]) { setInputMode(0); }
        setInputSet(newInputSet);
      }
    } else if (modeKeys.includes(key)) {
      const newInputMode = modeKeys.findIndex(element => element === key);
      if (inputMaps[inputSet]['maps'][newInputMode]) { setInputMode(newInputMode); }
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
        inputMap={inputMaps[inputSet]['maps'][inputMode]}
        undo={undo} redo={redo}
      />
    </div>
  );
};
