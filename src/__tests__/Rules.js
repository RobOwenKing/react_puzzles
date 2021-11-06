import { render, screen } from '@testing-library/react';
import { Rules } from '../components/Rules.jsx';

test('renders a <summary> button to expand the Rules', () => {
  /**
    * @todo Refactor to use getByRole
    *   Should be 'button' for <summary> but that wasn't working
  */
  const { container } = render(<Rules puzzle={{}}/>);
  expect(container.querySelector('summary')).toHaveTextContent('Rules')
});
