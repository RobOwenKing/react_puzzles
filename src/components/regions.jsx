import React from 'react';

import { create2DArray } from '../helpers/create2DArray.js';

const calculateDefaultCageWidth = (cols) => {
  let testValue = Math.ceil(Math.sqrt(cols));

  while (cols % testValue !== 0) { testValue += 1; }

  return testValue;
};

const setDefaultRegionsSquare = (rows, cols) => {
  const new2DArray = create2DArray(rows, cols, -1);

  const cageWidth = calculateDefaultCageWidth(cols);
  const cageHeight = rows / cageWidth;
  const cagesPerRow = cols / cageWidth;

  for (let j = 0; j < rows; j += 1) {
    for (let i = 0; i < cols; i += 1) {
      new2DArray[j][i] = Math.floor(i / cageWidth) + (Math.floor(j / cageHeight) * cagesPerRow);
    }
  }

  return new2DArray;
};

const setDefaultRegions = (rows, cols) => {
  /**
    @todo Handle case: offset
    @todo Handle case: non-square grid
  */
  if (rows === cols) {
    return setDefaultRegionsSquare(rows, cols);
  }
};

export const Regions = ({ rows, cols, regions, setRegions, cellSize }) => {
  React.useEffect(() => {
    if (regions.length === 0) {
      setRegions(setDefaultRegions(rows, cols));
    }
  }, [rows, cols, regions, setRegions])

  const colD = (i) => {
    if (i === 0 || i === cols) {
      return `v ${cellSize * rows}`;
    } else {
      let d = "";
      for (let j = 0; j < rows; j += 1) {
        d += regions[j][i-1] === regions[j][i] ? `m 0 ${cellSize}` : `v ${cellSize}`;
      }
      return d;
    }
  };

  const drawCols = () => {
    return (
      new Array(cols + 1).fill('0').map((element, index) => {
        return (<path className="region" key={index} d={`M ${index * cellSize} 0 ${colD(index)}`}></path>)
      })
    )
  };

  const rowD = (j) => {
    if (j === 0 || j === cols) {
      return `h ${cellSize * cols}`;
    } else {
      let d = "";
      for (let i = 0; i < cols; i += 1) {
        d += regions[j-1][i] === regions[j][i] ? `m ${cellSize} 0` : `h ${cellSize}`;
      }
      return d;
    }
  };

  const drawRows = () => {
    return (
      new Array(rows + 1).fill('0').map((element, index) => {
        return (<path className="region" key={index} d={`M 0 ${index * cellSize} ${rowD(index)}`}></path>)
      })
    )
  };

  return (
    <g>
      {regions.length > 0 && drawCols()}
      {regions.length > 0 && drawRows()}
    </g>
  );
};

/*  drawCellCageBorders(cell, cage) {
    const x = this.cells[cell].i * 100;
    const y = this.cells[cell].j * 100;
    let d = "";

    if (!cage.includes(cell - this.cols)) { d += `M ${x} ${y} h 101 `; }
    if (!cage.includes(cell + 1))         { d += `M ${x + 100} ${y} v 101 `; }
    if (!cage.includes(cell + this.cols)) { d += `M ${x} ${y + 100} h 101 `; }
    if (!cage.includes(cell - 1))         { d += `M ${x} ${y} v 101 `; }

    return d;
  }

  /*
    @todo Look at potential optimisations (of the output especially)
  */
  /*
  drawCage(container, cage, index) {
    let d = "";
    cage.forEach((cell) => {
      d += this.drawCellCageBorders(cell, cage);
    })
    container.insertAdjacentHTML('beforeend',
        `<path class="cage" data-index="${index}" d="${d}" />`);
  }
*/
