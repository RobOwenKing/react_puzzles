import { render, screen, fireEvent } from '@testing-library/react';

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
  it('should allow clicked on cells to be selected', () => {
    const { container } = render(<App />);
    const firstCell = container.querySelectorAll('rect.cell')[0];
    expect(container.querySelector('.selected')).toBeFalsy();
    fireEvent.mouseDown(firstCell);
    expect(container.querySelector('.selected')).toBeTruthy();
  });
});

/*
  expect(container.querySelector('summary')).toHaveTextContent('Rules');
  expect(screen.getByRole('listitem')).toHaveTextContent('Star Battle');
*/
