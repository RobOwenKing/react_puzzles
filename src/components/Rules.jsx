import React from 'react';

const parseStarBattle = (value, index) => {
  return (<li key={index}>Star Battle: Every row, column and region must contain exactly {value} large star{value === 1 ? '' : 's'}. Stars may not be in neighbouring cells (including diagonally).</li>);
};

const noRule = () => {
  return '';
};

const PUZZLE_TO_RULES = {
  'starbattle': parseStarBattle,
  'rows': noRule,
  'cols': noRule
};

export const Rules = ({ puzzle }) => {
  return (
    <details>
      <summary>Rules</summary>
      <ul>
        {Object.entries(puzzle).map(([key, value], index) => {
            return PUZZLE_TO_RULES[key].call(this, value, index); })
        }
      </ul>
    </details>
  );
};
