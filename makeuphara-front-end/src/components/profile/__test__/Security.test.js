import React from 'react';
import { render } from '@testing-library/react';

import Security from '../Security';

const user = {
  _id: '5ed8faf8d3fb0639901ba49d',
  username: 'master',
  name: 'master',
  provider: 'LOCAL',
};

const props = {
  user,
  form: {
    curPassword: '',
    newPassword: '',
    confirmPassword: '',
  },
  onChange: jest.fn(),
  onSubmit: jest.fn(),
  isValid: {
    curPassword: false,
    newPassword: false,
    confirmPassword: false,
  },
  validMessage: {
    curPassword: null,
    newPassword: null,
    confirmPassword: null,
  },
  submitPassword: {
    result: false,
    message: null,
  },
};

describe('<Security />', () => {
  it('should be render', () => {
    const { getByText, getByPlaceholderText } = render(<Security {...props} />);

    expect(getByText('비밀번호 변경')).toBeInTheDocument();
    expect(getByText('비밀번호를 변경할 수 있습니다.')).toBeInTheDocument();
    expect(getByPlaceholderText('기존 비밀번호 입력')).toBeInTheDocument();
    expect(getByPlaceholderText('변경할 비밀번호 입력')).toBeInTheDocument();
    expect(
      getByPlaceholderText('변경할 비밀번호 한번 더 입력'),
    ).toBeInTheDocument();
    expect(getByText('변경')).toBeInTheDocument();
  });
});
