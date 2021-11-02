import React from 'react';

import { Cell } from './Cell.jsx';

export const UIPanel = ({ inputHandler, inputMap }) => {
  const inputs = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

  const handleMouseDown = (event, id) => { inputHandler(id, false, false); };
  const handleMouseOver = () => { return; }

  const cellOrRect = (input, index) => {
    const i = index % 3;
    const j = Math.floor(index / 3);

    if (inputMap[input]) {
      return (
        <Cell
          key={input} id={input}
          contents={inputMap[input]}
          i={i} j={j} cellSize={100}
          mouseDownHandler={handleMouseDown}
          mouseOverHandler={handleMouseOver}
          selected={false}
        />
      )
    } else {
      return (
        <rect
          key={input} className="not-cell"
          x={i * 100} y={j * 100}
          width={100} height={100}
        />
      )
    }
  }

  return (
    <g id="inputs">
      {inputs.map((input, index) => { return cellOrRect(input, index); })}
    </g>
  );
};
