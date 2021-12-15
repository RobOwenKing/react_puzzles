import React from 'react';

import { Rules } from './Rules.jsx';
import { UIPanel } from './UIPanel.jsx';

import { handleArrowPress } from '../helpers/handleArrowPress.js';
import { handleKeyPress } from '../helpers/handleKeyPress.js';

import { useEventListener } from '../hooks/useEventListener.js';

export const PlayerUI = ({ puzzle, selecteds, setSelecteds, cells, setCells, undo, redo, rows, cols, inputMaps, checkErrors }) => {
  const [inputSet, setInputSet] = React.useState(0);

  const inputHandler = (key, ctrl, shft) => {
    const setKeys = ['a', 's', 'd', 'f'];

    if (key in inputMaps[inputSet]['maps'][0]) {
      setCells(handleKeyPress(key, cells, selecteds, checkErrors, inputMaps[inputSet]['maps'][0]));
    } else if (['ArrowUp', 'ArrowLeft', 'ArrowDown', 'ArrowRight'].includes(key)) {
      setSelecteds(handleArrowPress(key, ctrl, shft, selecteds, rows, cols));
    }else if (setKeys.includes(key)) {
      const newInputSet = setKeys.findIndex(element => element === key);
      if (inputMaps[newInputSet]) { setInputSet(newInputSet); }
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
        inputMap={inputMaps[inputSet]['maps'][0]}
        undo={undo} redo={redo}
      />
    </div>
  );
};
