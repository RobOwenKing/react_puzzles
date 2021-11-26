import { render, screen } from '@testing-library/react';

import { Puzzle } from '../../components/Puzzle.jsx';

import { setDefaultRegions } from '../../helpers/setDefaultRegions.js';

describe('Puzzle', () => {
  it('should render an image', () => {
    const rows = 6;
    const cols = 6;
    const puzzle = { 'starbattle': 1, rows: rows, cols: cols };
    const regions = setDefaultRegions(rows, cols);
    const constraints = {};

    render(<Puzzle
          rows={rows} cols={cols}
          constraints={constraints}
          puzzle={puzzle}
          regions={regions} />
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

    const { container } = render(<Puzzle
          rows={rows} cols={cols}
          constraints={constraints}
          puzzle={puzzle}
          regions={regions} />
      );
    expect(container.querySelectorAll('rect').length > rows * cols).toBeTruthy();
  });
});


