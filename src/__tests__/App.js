import { render, screen } from '@testing-library/react';

import App from '../App.js';

describe('App', () => {
  it('should render a title', () => {
    /**
      * @todo Refactor to use getByRole
      *   Should be 'button' for <summary> but that wasn't working
    */
    render(<App />);
    expect(screen.getByRole('heading')).toHaveTextContent('Pencil Puzzles Without Pencils');
  });
  it('should render an image', () => {
    render(<App />);
    expect(screen.getAllByRole('img')).toBeTruthy();
  });
});

/*
  expect(container.querySelector('summary')).toHaveTextContent('Rules');
  expect(screen.getByRole('listitem')).toHaveTextContent('Star Battle');
*/
