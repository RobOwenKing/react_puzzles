import React from 'react';

import { Cell } from './Cell.jsx';

export const UIPanel = ({ inputHandler, inputMap, undo }) => {
  const inputs = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

  const handleMouseDown = (event, id) => { inputHandler(id, false, false); };
  const handleMouseDownOnColour = (event) => { handleMouseDown(event, event.target.id); }
  const handleMouseOver = () => { return; };

  const cellOrRect = (input, index) => {
    const i = index % 3;
    const j = Math.floor(index / 3);


    if (inputMap[input]) {
      if (!inputMap[input].colours) {
        return (
          <Cell
            key={input} id={input}
            contents={inputMap[input]} className="cell-ip"
            i={i} j={j} cellSize={100}
            mouseDownHandler={handleMouseDown}
            mouseOverHandler={handleMouseOver}
            selected={false}
          />
        );
      } else {
        return (
          <rect
            key={input} id={input}
            className="cell-ip"
            x={i * 100} y={j * 100}
            width={100} height={100}
            style={{fill: inputMap[input].colours}}
            onMouseDown={handleMouseDownOnColour}
            selected={false}
          />
        );
      }
    } else {
      return (
        <rect
          key={input} className="not-cell"
          x={i * 100} y={j * 100}
          width={100} height={100}
        />
      );
    }
  }

  return (
    <svg
      version="1.1" xmlns="http://www.w3.org/2000/svg"
      id="input-panel" role="img"
      viewBox="-16 -16 332 332"
    >
      <g id="inputs">
        {inputs.map((input, index) => { return cellOrRect(input, index); })}
      </g>
    </svg>
  );
};
