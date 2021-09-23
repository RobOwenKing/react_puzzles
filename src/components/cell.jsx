import {ReactComponent as Star} from '../svg/star-solid.svg';

export const Cell = ({ i, j, contents, cellSize }) => {
  const handleClick = (event) => {
    event.preventDefault();
    console.log(i, j);
  }

  return (
    <g>
      <Star
        x={(i+0.5) * cellSize} y={(j+0.5) * cellSize}
        width={cellSize * 0.66} height={cellSize * 0.66}
      />
      <rect
        x={i * cellSize} y={j * cellSize}
        width={cellSize} height={cellSize}
        onClick={handleClick} />
    </g>
  );
};
