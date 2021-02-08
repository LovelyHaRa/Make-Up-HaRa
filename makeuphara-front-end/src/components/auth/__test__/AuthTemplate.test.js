import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import AuthTemplate from '../AuthTemplate';

describe('<AuthTemplate />', () => {
  it('should be render', () => {
    const { container, getByText } = render(
      <AuthTemplate>
        <div className="test-container">test</div>
      </AuthTemplate>,
      { wrapper: MemoryRouter },
    );

    expect(container.getElementsByClassName('logo-area')[0]).toHaveTextContent(
      'MAKE UP HARA',
    );
    expect(getByText('test')).toHaveClass('test-container');
  });
});
