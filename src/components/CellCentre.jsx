import React from 'react';

import { CellContents } from './CellContents.jsx';

export const CellCentre = ({ centres, x, y, cellSize }) => {
  const contents = () => {
    if (Array.isArray(centres)) {
      return centres[0];
    } else {
      return centres;
    }
  };

  const formatSingleContents = () => {
    return (
      <CellContents
          contents={centres}
          x={x} y={y}
          size={cellSize * 0.2} />
    )
  };

  return (
    <>
      { Array.isArray(centres) ? contents() : formatSingleContents() }
    </>
  );
};
