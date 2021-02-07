import React from 'react';
import { getByAltText, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import AuthForm from '../AuthForm';
import userEvent from '@testing-library/user-event';

const loginProps = {
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

const registerProps = {
  type: 'register',
  form: { username: '', password: '', passwordConfirm: '', name: '' },
  isValid: {
    username: true,
    password: true,
    passwordConfirm: true,
    name: true,
  },
  validMessage: {
    username: null,
    password: null,
    passwordConfirm: null,
    name: null,
  },
  onChange: jest.fn(),
  onSubmit: jest.fn(),
  error: null,
};

describe('<AuthForm />', () => {
  describe('Login form', () => {
    it('should be render', () => {
      const {
        container,
        getByPlaceholderText,
        getByText,
        getAllByText,
        getByAltText,
      } = render(<AuthForm {...loginProps} />, {
        wrapper: MemoryRouter,
      });

      expect(container.getElementsByTagName('h3')[0]).toHaveTextContent(
        /^로그인$/,
      );
      expect(getByPlaceholderText('계정 이름')).toBeInTheDocument();
      expect(getByPlaceholderText('비밀번호')).toBeInTheDocument();
      expect(getAllByText('로그인')[1]).toBeInTheDocument();
      expect(getByText('구글로 로그인')).toBeInTheDocument();
      expect(getByAltText('naver-login-btn')).toBeInTheDocument();
      expect(getByAltText('kakao-login-btn')).toBeInTheDocument();
      expect(
        container.getElementsByClassName('auth-link')[0],
      ).toHaveTextContent(/^회원가입$/);
    });

    it('should be call function', () => {
      const { getByPlaceholderText, getAllByText, getByAltText } = render(
        <AuthForm {...loginProps} />,
        {
          wrapper: MemoryRouter,
        },
      );

      const username = getByPlaceholderText('계정 이름');
      const password = getByPlaceholderText('비밀번호');
      userEvent.type(username, 'username');
      userEvent.type(password, 'password');
      expect(loginProps.onChange).toBeCalledTimes(16);

      loginProps.onSubmit.mockImplementation((e) => {
        e.preventDefault();
      });
      const buttonLocal = getAllByText('로그인')[1];
      userEvent.click(buttonLocal, { button: 0 });
      expect(loginProps.onSubmit).toBeCalled();

      const buttonNaver = getByAltText('naver-login-btn');
      userEvent.click(buttonNaver, { button: 0 });
      expect(loginProps.onNaverLoginClick).toBeCalled();

      const buttonKakao = getByAltText('kakao-login-btn');
      userEvent.click(buttonKakao, { button: 0 });
      expect(loginProps.onKakaoLoginClick).toBeCalled();
    });
  });

  describe('Register form', () => {
    it('should be render', () => {
      const { container, getByPlaceholderText, getAllByText } = render(
        <AuthForm {...registerProps} />,
        {
          wrapper: MemoryRouter,
        },
      );

      expect(container.getElementsByTagName('h3')[0]).toHaveTextContent(
        /^회원가입$/,
      );
      expect(getByPlaceholderText('계정 이름')).toBeInTheDocument();
      expect(getByPlaceholderText('비밀번호')).toBeInTheDocument();
      expect(getByPlaceholderText('비밀번호 확인')).toBeInTheDocument();
      expect(getByPlaceholderText('활동명')).toBeInTheDocument();
      expect(getAllByText('회원가입')[1]).toBeInTheDocument();
      expect(
        container.getElementsByClassName('auth-link')[0],
      ).toHaveTextContent(/^로그인$/);
    });

    it('should be call function', () => {
      const { getByPlaceholderText, getAllByText } = render(
        <AuthForm {...registerProps} />,
        {
          wrapper: MemoryRouter,
        },
      );

      const username = getByPlaceholderText('계정 이름');
      const password = getByPlaceholderText('비밀번호');
      const passwordConfirm = getByPlaceholderText('비밀번호 확인');
      const name = getByPlaceholderText('활동명');
      userEvent.type(username, 'username');
      userEvent.type(password, 'password');
      userEvent.type(passwordConfirm, 'password');
      userEvent.type(name, 'test01');
      expect(registerProps.onChange).toBeCalledTimes(30);

      registerProps.onSubmit.mockImplementation((e) => {
        e.preventDefault();
      });
      const buttonRegister = getAllByText('회원가입')[1];
      userEvent.click(buttonRegister, { button: 0 });
      expect(registerProps.onSubmit).toBeCalled();
    });
  });
});
