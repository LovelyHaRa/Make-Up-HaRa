import React from 'react';
import { getByAltText, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import AuthForm from '../AuthForm';
import userEvent from '@testing-library/user-event';

const props = {
  type: 'login',
  form: {
    username: '',
    password: '',
  },
  onChange: jest.fn(),
  onSubmit: jest.fn(),
  error: null,
  googleLoginBtn: null,
  onNaverLoginClick: jest.fn(),
  onKakaoLoginClick: jest.fn(),
};

describe('<AuthForm />', () => {
  it('should be render', () => {
    const {
      container,
      getByPlaceholderText,
      getByText,
      getAllByText,
      getByAltText,
    } = render(<AuthForm {...props} />, {
      wrapper: MemoryRouter,
    });

    expect(container.getElementsByTagName('h3')[0]).toHaveTextContent('로그인');
    expect(getByPlaceholderText('계정 이름')).toBeInTheDocument();
    expect(getByPlaceholderText('비밀번호')).toBeInTheDocument();
    expect(getAllByText('로그인')[1]).toBeInTheDocument();
    expect(getByText('구글로 로그인')).toBeInTheDocument();
    expect(getByAltText('naver-login-btn')).toBeInTheDocument();
    expect(getByAltText('kakao-login-btn')).toBeInTheDocument();
  });

  it('should be call function', () => {
    const {
      getByPlaceholderText,
      getAllByText,
      getByText,
      getByAltText,
    } = render(<AuthForm {...props} />, {
      wrapper: MemoryRouter,
    });

    const username = getByPlaceholderText('계정 이름');
    const password = getByPlaceholderText('비밀번호');
    userEvent.type(username, 'username');
    userEvent.type(password, 'password');
    expect(props.onChange).toBeCalledTimes(16);

    props.onSubmit.mockImplementation((e) => {
      e.preventDefault();
    });
    const buttonLocal = getAllByText('로그인')[1];
    userEvent.click(buttonLocal, { button: 0 });
    expect(props.onSubmit).toBeCalled();

    const buttonNaver = getByAltText('naver-login-btn');
    userEvent.click(buttonNaver, { button: 0 });
    expect(props.onNaverLoginClick).toBeCalled();

    const buttonKakao = getByAltText('kakao-login-btn');
    userEvent.click(buttonKakao, { button: 0 });
    expect(props.onKakaoLoginClick).toBeCalled();
  });
});
