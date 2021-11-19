import { useState, useRef } from "react";

import { createCells } from '../helpers/create2DArray.js';

export function useCells(rows, cols) {
  const [currentCells, setCurrentCells] = useState(createCells(rows, cols));
  const undoQueue = useRef([]);

  /**
    * @todo Use copyOfCells()
  */
  const copyOfCells = () => {
    return JSON.parse(JSON.stringify(currentCells));
  };

  const setCells = (newCells) => {
    const diffForUndoQueue = [];

    currentCells.forEach((cell, index) => {
      const newCell = newCells[index];
      if (cell?.entry !== newCell?.entry ||
          cell.centres.length !== newCell.centres.length ||
          cell.errors.length !== newCell.errors.length
      ) { diffForUndoQueue.push(cell); }
    })

    undoQueue.current.push(diffForUndoQueue);
    setCurrentCells(newCells);
  };

  const undo = () => {
    const diff = undoQueue.current.pop();

    const newCells = copyOfCells().map((cell) => {
      if (diff[0] && diff[0].id === cell.id) {
        return diff.shift();
      } else {
        return cell;
      }
    });

    setCurrentCells(newCells);
  };

  return { cells: currentCells, copyOfCells, setCells, undo };
}
