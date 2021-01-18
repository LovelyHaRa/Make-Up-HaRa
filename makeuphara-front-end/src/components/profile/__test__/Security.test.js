import React from 'react';
import { fireEvent, render } from '@testing-library/react';

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

  it('function should be called when change password', () => {
    const nextProps = {
      ...props,
      isValid: {
        curPassword: true,
        newPassword: true,
        confirmPassword: true,
      },
    };
    nextProps.onSubmit.mockImplementation((e) => {
      e.preventDefault();
    });
    const { getByText, getByPlaceholderText } = render(
      <Security {...nextProps} />,
    );
    const curPassword = getByPlaceholderText('기존 비밀번호 입력');
    fireEvent.change(curPassword, { target: { value: 'test1234' } });
    const newPassword = getByPlaceholderText('변경할 비밀번호 입력');
    fireEvent.change(newPassword, { target: { value: '1234test' } });
    const confirmPassword = getByPlaceholderText(
      '변경할 비밀번호 한번 더 입력',
    );
    fireEvent.change(confirmPassword, { target: { value: '1234test' } });
    expect(nextProps.onChange).toBeCalledTimes(3);

    fireEvent.click(getByText('변경'));
    expect(nextProps.onSubmit).toBeCalled();
  });
});
