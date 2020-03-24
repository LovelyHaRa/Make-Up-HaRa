import React from 'react';
import styled from 'styled-components';
import Button from '../common/Button';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import palette from '../../lib/styles/open-color';

const AuthFormBlock = styled.div`
  h3 {
    margin: 0;
    color: ${({ theme }) => theme.text};
    margin-bottom: 1rem;
    font-weight: normal;
  }
`;

const StyledInput = styled.input`
  font-size: 1rem;
  border: none;
  border-bottom: 2px solid ${({ theme }) => theme.loginInputBorder};
  padding-bottom: 0.5rem;
  background: ${({ theme }) => theme.body};
  color: ${({ theme }) => theme.text};
  outline: none;
  width: 100%;
  &:focus {
    border-bottom: 2px solid ${({ theme }) => theme.loginInputBorderFocus};
    -webkit-transition: all 0.3s ease;
    transition: all 0.3s ease;
  }
  & + & {
    margin-top: 1rem;
  }
  &::placeholder {
    font-weight: normal;
  }
`;

const Footer = styled.div`
  margin-top: 2rem;
  text-align: right;
  a {
    color: ${({ theme }) => theme.text};
    &:hover {
      color: ${({ theme }) => theme.hoverText};
      text-decoration: underline !important;
    }
  }
`;

const ButtonWithMarginTop = styled(Button)`
  margin-top: 1rem;
`;

const textMap = {
  login: '로그인',
  signinGoogle: '구글로 로그인 하기',
  register: '회원가입',
};

const ErrorMessage = styled.div`
  color: ${palette.red[9]};
  text-align: center;
  font-size: 0.75rem;
  margin-top: 1rem;
`;

const AuthForm = ({ type, form, onChange, onSubmit, error }) => {
  const text = textMap[type];

  return (
    <AuthFormBlock>
      <h3>{text}</h3>
      <form onSubmit={onSubmit}>
        <StyledInput
          autoComplete="username"
          name="username"
          placeholder="이메일 또는 계정명"
          value={form.username}
          onChange={onChange}
        />
        <StyledInput
          type="password"
          autoComplete="new-password"
          name="password"
          placeholder="비밀번호"
          value={form.password}
          onChange={onChange}
        />
        {type === 'register' && (
          <StyledInput
            type="password"
            autoComplete="new-password"
            name="passwordConfirm"
            placeholder="비밀번호 확인"
            value={form.passwordConfirm}
            onChange={onChange}
          />
        )}
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <ButtonWithMarginTop cyan fullWidth>
          {text}
        </ButtonWithMarginTop>
      </form>
      {type === 'login' && (
        <div>
          <hr />
          <Button indigo fullWidth>
            <FontAwesomeIcon icon={faGoogle} />
            <span> </span>
            {textMap['signinGoogle']}
          </Button>
        </div>
      )}

      <Footer>
        {type === 'login' ? (
          <Link to="/register">회원가입</Link>
        ) : (
          <Link to="/login">로그인</Link>
        )}
      </Footer>
    </AuthFormBlock>
  );
};

export default AuthForm;
