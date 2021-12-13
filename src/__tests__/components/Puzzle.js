import { render, screen } from '@testing-library/react';

import { Puzzle } from '../../components/Puzzle.jsx';

import { INPUT_MAPS } from '../../helpers/inputMaps.js';
import { setDefaultRegions } from '../../helpers/setDefaultRegions.js';

describe('Puzzle', () => {
  it('should render an image', () => {
    const rows = 6;
    const cols = 6;
    const puzzle = { 'starbattle': 1, rows: rows, cols: cols };
    const regions = setDefaultRegions(rows, cols);
    const constraints = {};
    const inputMaps= [INPUT_MAPS];

    render(<Puzzle
          rows={rows} cols={cols}
          constraints={constraints}
          puzzle={puzzle}
          regions={regions}
          inputMaps={inputMaps} />
      );
    /**
      * @todo Refactor to use getByRole
      *   Should be 'button' for <summary> but that wasn't working
    */
    expect(screen.getAllByRole('img')).toBeTruthy();
  });
  it('should render a bunch of <rect>s', () => {
    const rows = 6;
    const cols = 6;
    const puzzle = { 'starbattle': 1, rows: rows, cols: cols };
    const regions = setDefaultRegions(rows, cols);
    const constraints = {};
    const inputMaps= [INPUT_MAPS];

    const { container } = render(<Puzzle
          rows={rows} cols={cols}
          constraints={constraints}
          puzzle={puzzle}
          regions={regions}
          inputMaps={inputMaps} />
      );
    expect(container.querySelectorAll('rect').length > rows * cols).toBeTruthy();
  });
});


