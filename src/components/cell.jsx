export const Cell = ({ i, j, contents, cellSize }) => {
  const handleClick = (event) => {
    event.preventDefault();
    console.log(i, j);
  }

  return (
    <g>
      <rect
        x={i * cellSize} y={j * cellSize}
        width={cellSize} height={cellSize}
        onClick={handleClick} />
    </g>
  );
};
