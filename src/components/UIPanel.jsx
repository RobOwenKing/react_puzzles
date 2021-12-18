import React from 'react';

import { Cell } from './Cell.jsx';

export const UIPanel = ({ inputHandler, inputMaps, inputMap, undo, redo, updateInputSet, updateInputMode }) => {
  const inputs = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

  const handleMouseDown = (event, id) => { inputHandler(id, false, false); };
  const handleMouseDownOnColour = (event) => { handleMouseDown(event, event.target.id); }
  const handleMouseOver = () => { return; };

  const returnEntryCell = (input, i, j) => {
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
  };

  const returnColourRect = (input, i, j) => {
    return (
      <rect
        key={input} id={input}
        className="cell-ip"
        x={i * 100} y={j * 100}
        width={100} height={100}
        style={{fill: inputMap[input].colour}}
        onMouseDown={handleMouseDownOnColour}
      />
    );
  };

  const returnPlaceholderRect = (input, i, j) => {
    return (
      <rect
        key={input} className="not-cell"
        x={i * 100} y={j * 100}
        width={100} height={100}
      />
    );
  };

  const inputToSVG = (input, index) => {
    const i = index % 3;
    const j = Math.floor(index / 3);

    if (inputMap[input]) {
      if (!inputMap[input].colour) {
        return returnEntryCell(input, i, j);
      } else {
        return returnColourRect(input, i, j);
      }
    } else {
      return returnPlaceholderRect(input, i, j);
    }
  };

  return (
    <>
      <ul>
        { inputMaps.map((set, index) => {
          return (<li key={index} onClick={() => { updateInputSet(index); }}>{set.name}</li>);
        }) }
      </ul>
      <svg
        version="1.1" xmlns="http://www.w3.org/2000/svg"
        id="input-panel" role="img"
        viewBox="-16 -16 332 452"
      >
        <g id="inputs">
          {inputs.map((input, index) => { return inputToSVG(input, index); })}
        </g>
        <g id="controls">
          <Cell
            contents={{entry: 'undo'}} className="cell-ip"
            i={0} j={3.2} cellSize={100}
            mouseDownHandler={() => { undo(); }}
            mouseOverHandler={handleMouseOver}
            selected={false}
          />
          <Cell
            contents={{entry: 'redo'}} className="cell-ip"
            i={1} j={3.2} cellSize={100}
            mouseDownHandler={() => { redo(); }}
            mouseOverHandler={handleMouseOver}
            selected={false}
          />
        </g>
      </svg>
    </>
  );
};
