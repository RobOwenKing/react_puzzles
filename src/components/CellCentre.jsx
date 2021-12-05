import React from 'react';

import { CellContents } from './CellContents.jsx';

const setYOffset = (index, length) => {
  if (length < 5) { return 0; }

  return index < 4 ? -0.5 : 0.5;
};

const setXOffset = (index, length) => {
  const groupWidth = index < 4 ? Math.min(length, 4) : length - 4;
  const indexInGroup = index % 4;

  return indexInGroup - (groupWidth / 2) + 0.5;
};

export const CellCentre = ({ centres, x, y, cellSize }) => {
  const formatSingleContents = () => {
    return (
      <CellContents
          contents={centres}
          x={x} y={y}
          size={cellSize * 0.18} />
    );
  };

  const formatArrayContents = () => {
    const contentsToDisplay = centres.length > 8 ? centres.slice(0, 8) : centres;
    const length = contentsToDisplay.length;

    return contentsToDisplay.map((element, index) => {
      const yOffset = setYOffset(index, length);
      const xOffset = setXOffset(index, length);

      return (
        <CellContents
            contents={element} key={index}
            x={x + (xOffset*20)} y={y + (yOffset*20)}
            size={cellSize * 0.18} />
      );
    });
  };

  return (
    <>
      { Array.isArray(centres) ? formatArrayContents() : formatSingleContents() }
    </>
  );
};
