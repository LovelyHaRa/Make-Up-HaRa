import React from 'react';
import { render } from '@testing-library/react';

import LoadingProgress from '../LoadingProgress';

describe('<LoadingProgress />', () => {
  it('should be full height render', () => {
    const { container } = render(<LoadingProgress full />);
    const block = container.getElementsByClassName('full-height')[0];
    expect(block).toBeInTheDocument();
    expect(block).toHaveStyle({ height: '100vh' });
  });

  it('should be body height render', () => {
    const { container } = render(<LoadingProgress body />);
    const block = container.getElementsByClassName('body-height')[0];
    expect(block).toBeInTheDocument();
    expect(block).toHaveStyle({ height: '90vh' });
  });

  it('should be custom height render', () => {
    const { container } = render(<LoadingProgress customHeight={80} />);
    const block = container.getElementsByTagName('div')[0];
    expect(block).toBeInTheDocument();
    expect(block).toHaveStyle({ height: '80vh' });
  });
});
