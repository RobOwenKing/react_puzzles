import { useEffect, useRef, useState } from "react";

import { createCells } from '../helpers/create2DArray.js';

export function useCells(rows, cols) {
  const [currentCells, setCurrentCells] = useState(createCells(rows, cols));
  const undoStack = useRef([]);
  const redoStack = useRef([]);

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
    const diffForUndoStack = [];

    currentCells.forEach((cell, index) => {
      const newCell = newCells[index];
      if (cell?.entry !== newCell?.entry ||
          cell.centres.length !== newCell.centres.length ||
          cell.errors.length !== newCell.errors.length
      ) { diffForUndoStack.push(cell); }
    })

    undoStack.current.push(diffForUndoStack);
    if (_isMounted.current) {
      setCurrentCells(newCells);
      redoStack.current = [];
    }
  };

  const canUndo = () => {
    return undoStack.current.length !== 0;
  };

  const undo = () => {
    if (!canUndo()) { return; }

    const undoDiff = undoStack.current.pop();
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
      redoStack.current.push(redoDiff);
    }
  };

  const canRedo = () => {
    return redoStack.current.length !== 0;
  };

  const redo = () => {
    if (!canRedo()) { return; }

    const undoDiff = [];
    const redoDiff = redoStack.current.pop();

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
      undoStack.current.push(undoDiff);
    }
  };

  return { cells: currentCells, copyOfCells, setCells, canUndo, undo, canRedo, redo };
}
