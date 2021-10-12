import React from 'react';

import { useEventListener } from '../hooks/useEventListener.js';

export const PlayerUI = ({ cells, setCells }) => {
  const handleInput = (e) => {
    console.log(e);
  };

  useEventListener('keydown', (e) => { handleInput(e) });

  return (
    <svg></svg>
  );
};
