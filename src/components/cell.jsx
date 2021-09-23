import {ReactComponent as Star} from '../svg/star-solid.svg';

export const Cell = ({ i, j, contents, cellSize }) => {
  const handleClick = (event) => {
    event.preventDefault();
    console.log(i, j);
  }

  return (
    <g>
      <Star
        className="fa-icon"
        x={(i+0.5) * cellSize} y={(j+0.5) * cellSize}
        width={cellSize / 2} height={cellSize / 2}
      />
      <rect
        x={i * cellSize} y={j * cellSize}
        width={cellSize} height={cellSize}
        onClick={handleClick} />
    </g>
  );
};
