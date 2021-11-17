import { useState, useRef } from "react";

import { createCells } from '../helpers/create2DArray.js';

export const useCells = (rows, cols) => {
  const [currentCells, setCurrentCells] = useState(createCells(rows, cols));
  const undoQueue = useRef([]);
  const diffForUndoQueue = useRef([]);

  const setCells = (newCells) => {
    if (diffForUndoQueue.current.length > 0) { undoQueue.current.push(diffForUndoQueue.current); }

    diffForUndoQueue.current = [];
    currentCells.forEach((cell, index) => {
      /**
        * @todo Improve below comparison
      */
      if (cell !== newCells[index]) { diffForUndoQueue.current.push(cell); }
    })

    setCurrentCells(newCells);
  }

  return [currentCells, setCells];
}
