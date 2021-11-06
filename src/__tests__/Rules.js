import { render, screen } from '@testing-library/react';
import { Rules } from '../components/Rules.jsx';

describe('Rules', () => {
  test('should render a <summary> button to expand the Rules', () => {
    /**
      * @todo Refactor to use getByRole
      *   Should be 'button' for <summary> but that wasn't working
    */
    const { container } = render(<Rules puzzle={{}}/>);
    expect(container.querySelector('summary')).toHaveTextContent('Rules')
  });

  test('should render a rule when used in the puzzle', () => {
    render(<Rules puzzle={{ starbattle: 2 }}/>);
    expect(screen.getByRole('listitem')).toHaveTextContent('Star Battle');
  });

  /**
    * @todo Test it doesn't render rules not used in the puzzle
  */

  test('should make rules specific to the puzzle', () => {
    render(<Rules puzzle={{ starbattle: 3 }}/>);
    expect(screen.getByRole('listitem')).toHaveTextContent('3');
  });
})
