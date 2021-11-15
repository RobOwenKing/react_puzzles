import { useState } from "react";

import { createCells } from '../helpers/create2DArray.js';

export const useCells = (rows, cols) => {
  const [cells, setCells] = useState(createCells(rows, cols));

  return [cells, setCells];
}
