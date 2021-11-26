import { render } from '@testing-library/react';

import { Cell } from '../../components/Cell.jsx';

describe('Cell', () => {
  it('should render a <rect> with correct x, y, width and height', () => {
    const { container } = render(<svg>
      <Cell
        i='0' j='1' id='0'
        contents='' cellSize='100'
        className='cell'
        mouseOverHandler={() => { return; }}
        mouseDownHandler={() => { return; }}
        selected={false} />
      </svg>);
    expect(container.querySelector('rect')).toBeTruthy();
    expect(container.querySelector('[x="0"]')).toBeTruthy();
    expect(container.querySelector('[y="100"]')).toBeTruthy();
    expect(container.querySelector('[width="100"]')).toBeTruthy();
    expect(container.querySelector('[height="100"]')).toBeTruthy();
  });
  it('should render a <rect> with class .selected when applicable', () => {
    const { container } = render(<svg>
      <Cell
        i='0' j='1' id='0'
        contents='' cellSize='100'
        className='cell'
        mouseOverHandler={() => { return; }}
        mouseDownHandler={() => { return; }}
        selected={true} />
      </svg>);
    expect(container.querySelector('rect.selected')).toBeTruthy();
  });
  it('should not render a <rect> with class .selected when not applicable', () => {
    const { container } = render(<svg>
      <Cell
        i='0' j='1' id='0'
        contents='' cellSize='100'
        className='cell'
        mouseOverHandler={() => { return; }}
        mouseDownHandler={() => { return; }}
        selected={false} />
      </svg>);
    expect(container.querySelector('rect.selected')).toBeFalsy();
  });
});
