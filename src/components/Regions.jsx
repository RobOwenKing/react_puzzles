import React from 'react';

export const Regions = ({ rows, cols, regions, cellSize }) => {
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
    <>
      {regions.length > 0 && drawCols()}
      {regions.length > 0 && drawRows()}
    </>
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
