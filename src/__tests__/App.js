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
  it('should allow multiple cells to be selected with the mouse by holding ctrl', () => {
    const { container } = render(<App />);
    const firstCell = container.querySelectorAll('rect.cell')[0];
    const secondCell = container.querySelectorAll('rect.cell')[1];
    fireEvent.mouseDown(firstCell);
    fireEvent.mouseDown(secondCell, { ctrlKey: true });
    expect(container.querySelectorAll('.selected').length === 2).toBeTruthy();
  });
  it('should deselect selected cell if neither ctrl or shift held down', () => {
    const { container } = render(<App />);
    const firstCell = container.querySelectorAll('rect.cell')[0];
    const secondCell = container.querySelectorAll('rect.cell')[1];
    fireEvent.mouseDown(firstCell);
    fireEvent.mouseDown(secondCell, { ctrlKey: false, shiftKey: false });
    expect(container.querySelectorAll('.selected').length === 1).toBeTruthy();
  });
  it('should allow multiple cells to be selected with the mouse by holding and dragging', () => {
    const { container } = render(<App />);
    const firstCell = container.querySelectorAll('rect.cell')[0];
    const secondCell = container.querySelectorAll('rect.cell')[1];
    fireEvent.mouseDown(firstCell);
    fireEvent.mouseOver(secondCell);
    expect(container.querySelectorAll('.selected').length === 2).toBeTruthy();
  });
  it('should deselect cells when clicking after releasing the mouse after holding and dragging', () => {
    const { container } = render(<App />);
    const firstCell = container.querySelectorAll('rect.cell')[0];
    const secondCell = container.querySelectorAll('rect.cell')[1];
    const thirdCell = container.querySelectorAll('rect.cell')[2];
    fireEvent.mouseDown(firstCell);
    fireEvent.mouseOver(secondCell);
    fireEvent.mouseUp(secondCell);
    fireEvent.mouseDown(thirdCell);
    expect(container.querySelectorAll('.selected').length === 1).toBeTruthy();
  });
  it('should allow multiple cells to be selected with the arrows by holding shift', () => {
    const { container } = render(<App />);
    const firstCell = container.querySelectorAll('rect.cell')[0];
    fireEvent.mouseDown(firstCell);
    fireEvent.keyDown(firstCell, { key: 'ArrowDown', shiftKey: true });
    expect(container.querySelectorAll('.selected').length === 2).toBeTruthy();
  });
  it('should allow entries to be made', () => {
    const { container } = render(<App />);
    const firstCell = container.querySelectorAll('rect.cell')[0];
    fireEvent.mouseDown(firstCell);
    fireEvent.keyDown(firstCell, { key: '2' });
    expect(screen.getAllByRole('img')[0]).toHaveTextContent('star-solid.svg');
  });
});

/*
  expect(container.querySelector('summary')).toHaveTextContent('Rules');
  expect(screen.getByRole('listitem')).toHaveTextContent('Star Battle');
*/
