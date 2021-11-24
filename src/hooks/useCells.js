import { useEffect, useRef, useState } from "react";

import { createCells } from '../helpers/create2DArray.js';

export function useCells(rows, cols) {
  const [currentCells, setCurrentCells] = useState(createCells(rows, cols));
  const undoQueue = useRef([]);
  const redoQueue = useRef([]);

  const _isMounted = useRef(true);

  useEffect(() => {
    _isMounted.current = true;
    return () => {
      _isMounted.current = false;
    }
  }, []);

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
    if (_isMounted.current) {
      setCurrentCells(newCells);
      redoQueue.current = [];
    }
  };

  const canUndo = () => {
    return undoQueue.current.length !== 0;
  };

  const undo = () => {
    if (!canUndo()) { return; }

    const undoDiff = undoQueue.current.pop();
    const redoDiff = [];

    const newCells = copyOfCells().map((cell) => {
      if (undoDiff[0] && undoDiff[0].id === cell.id) {
        redoDiff.push(cell);
        return undoDiff.shift();
      } else {
        return cell;
      }
    });

    if (_isMounted.current) {
      setCurrentCells(newCells);
      redoQueue.current.push(redoDiff);
    }
  };

  const canRedo = () => {
    return redoQueue.current.length !== 0;
  };

  const redo = () => {
    if (!canRedo()) { return; }

    const undoDiff = [];
    const redoDiff = redoQueue.current.pop();

    const newCells = copyOfCells().map((cell) => {
      if (redoDiff[0] && redoDiff[0].id === cell.id) {
        undoDiff.push(cell);
        return redoDiff.shift();
      } else {
        return cell;
      }
    });

    if (_isMounted.current) {
      setCurrentCells(newCells);
      undoQueue.current.push(redoDiff);
    }
  };

  return { cells: currentCells, copyOfCells, setCells, canUndo, undo, canRedo, redo };
}
