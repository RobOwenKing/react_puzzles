import React from 'react';

import { Cell } from './Cell.jsx';

export const UIPanel = ({ inputHandler, inputMap }) => {
  const inputs = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

  const handleMouseDown = (event, id) => { inputHandler(id, false, false); };
  const handleMouseOver = () => { return; }

  const cellOrRect = (input, index) => {
    if (inputMap[input]) {
      return (
        <Cell
          key={input} id={input}
          contents={inputMap[input]}
          i={index % 3} j={Math.floor(index / 3)} cellSize={100}
          mouseDownHandler={handleMouseDown}
          mouseOverHandler={handleMouseOver}
          selected={false}
        />
      )
    } else {
      return (
        <rect
          key={input} className="not-cell"
          x={(index % 3) * 100} y={Math.floor(index / 3) * 100}
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
