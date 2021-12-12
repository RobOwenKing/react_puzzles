import React from 'react';

import { Rules } from './Rules.jsx';
import { UIPanel } from './UIPanel.jsx';

import { handleArrowPress } from '../helpers/handleArrowPress.js';
import { handleKeyPress } from '../helpers/handleKeyPress.js';

import { useEventListener } from '../hooks/useEventListener.js';

const INPUT_TO_ENTRY = {
  '1': {'entry': 'star'},
  '2': {'centres': 'star'},
  '3': {'entry': 'dot'},
  '4': {'centres': 'hsl(0 67% 67%)'},
  '5': {'centres': 'hsl(40 67% 67%)'},
  '6': {'centres': 'hsl(80 67% 67%)'},
  '7': {'centres': 'hsl(120 67% 67%)'},
  '8': {'centres': 'hsl(160 67% 67%)'},
  '9': {'centres': 'hsl(200 67% 67%)'}
};

export const PlayerUI = ({ puzzle, selecteds, setSelecteds, cells, setCells, undo, redo, rows, cols, checkErrors }) => {
  const [inputSet, setInputSet] = React.useState(0);

  const inputHandler = (key, ctrl, shft) => {
    if (key in INPUT_TO_ENTRY) {
      setCells(handleKeyPress(key, cells, selecteds, checkErrors, INPUT_TO_ENTRY));
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
        inputMap={INPUT_TO_ENTRY}
        undo={undo} redo={redo}
      />
    </div>
  );
};
