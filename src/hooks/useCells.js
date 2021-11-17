import { useState, useRef } from "react";

import { createCells } from '../helpers/create2DArray.js';

export const useCells = (rows, cols) => {
  const [currentCells, setCurrentCells] = useState(createCells(rows, cols));
  const undoQueue = useRef([]);

  const setCells = (newCells) => {
    const diffForUndoQueue = [];

    diffForUndoQueue.current = [];
    currentCells.forEach((cell, index) => {
      const newCell = newCells[index];
      if (cell.entry !== newCell.entry ||
          cell.centres.length !== newCell.centres.length ||
          cell.errors.length !== newCell.errors.length
      ) { diffForUndoQueue.current.push(cell); }
    })

    undoQueue.current.push(diffForUndoQueue.current);
    setCurrentCells(newCells);
  }

  return [currentCells, setCells];
}
