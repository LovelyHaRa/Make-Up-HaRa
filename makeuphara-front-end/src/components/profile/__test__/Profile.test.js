import React from 'react';
import { render } from '@testing-library/react';

import Profile from '../Profile';

const user = {
  _id: '5ed8faf8d3fb0639901ba49d',
  username: 'master',
  name: 'master',
  provider: 'LOCAL',
};

const props = {
  user,
  form: {
    name: '',
  },
  onChange: jest.fn(),
  onSubmit: jest.fn(),
  isValid: { existName: true, equalName: true },
  validMessage: {
    existName: null,
  },
  resultMessage: {
    submit: null,
    error: null,
  },
};

describe('<Profile />', () => {
  it('should be render', () => {
    const { username, provider } = user;
    const { getByText } = render(<Profile {...props} />);
    expect(getByText('ID')).toBeInTheDocument();
    expect(getByText(username)).toBeInTheDocument();
    expect(getByText('로그인 유형')).toBeInTheDocument();
    expect(getByText(provider)).toBeInTheDocument();
    expect(getByText('DISPLAY NAME')).toBeInTheDocument();
    expect(getByText('수정')).toBeInTheDocument();
  });
});
