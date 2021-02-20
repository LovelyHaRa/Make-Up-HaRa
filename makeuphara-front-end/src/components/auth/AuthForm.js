import React from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import Button, { buttonStyle } from '../common/Button';
import palette from '../../lib/styles/open-color';

const AuthFormBlock = styled.div`
  h3 {
    margin: 0;
    color: ${({ theme }) => theme.text};
    margin-bottom: 1rem;
    font-weight: 600;
    font-family: 'NanumBarunGothic';
  }
  hr {
    border: 0.5px solid ${({ theme }) => theme.loginInputBorder};
  }
  .social-login {
    button + a {
      margin-top: 0.5rem;
    }
    a + button {
      margin-top: 0.5rem;
    }
  }
  input.possible {
    border-bottom: 2px solid ${({ theme }) => theme.profileInputValid};
  }
  input.impossible {
    border-bottom: 2px solid ${({ theme }) => theme.profileInputInValid};
  }
  .invalid-message {
    color: ${({ theme }) => theme.errorText};
    font-size: 0.75rem;
    font-family: 'NanumBarunGothic';
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
    font-weight: 300;
    font-family: 'NanumBarunGothic';
  }
`;

const Footer = styled.div`
  margin-top: 1rem;
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

const GoogleLoginButton = styled.button`
  ${buttonStyle}
  border-radius: 0.375rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const socialBtnStyle = css`
  border: none;
  padding: 0;
  display: block;
  border-radius: 0.5rem;
  img {
    width: 100%;
    display: flex;
    &:hover {
      opacity: 0.8;
    }
  }
`;

const NaverLoginButton = styled.a`
  ${buttonStyle}
  ${socialBtnStyle}
`;

const KakaoLoginButton = styled.button`
  ${buttonStyle}
  ${socialBtnStyle}
`;

const textMap = {
  login: '로그인',
  signinGoogle: '구글로 로그인',
  register: '회원가입',
};

const ErrorMessage = styled.div`
  color: ${palette.red[9]};
  text-align: center;
  font-size: 0.75rem;
  margin-top: 1rem;
`;

const AuthForm = ({
  type,
  form,
  isValid,
  validMessage,
  onChange,
  onSubmit,
  error,
  googleLoginBtn,
  onNaverLoginClick,
  onKakaoLoginClick,
}) => {
  const text = textMap[type];

  return (
    <AuthFormBlock>
      <h3>{text}</h3>
      <form onSubmit={onSubmit}>
        <StyledInput
          autoComplete="username"
          className={
            type === 'register' &&
            form.username.length > 0 &&
            (isValid.username ? 'possible' : 'impossible')
          }
          name="username"
          placeholder="계정 이름"
          value={form.username}
          onChange={onChange}
        />
        {type === 'register' && !isValid.username && (
          <span className="invalid-message">{validMessage.username}</span>
        )}
        <StyledInput
          type="password"
          autoComplete="new-password"
          className={
            type === 'register' &&
            form.password.length > 0 &&
            (isValid.password ? 'possible' : 'impossible')
          }
          name="password"
          placeholder="비밀번호"
          value={form.password}
          onChange={onChange}
        />
        {type === 'register' && !isValid.password && (
          <span className="invalid-message">{validMessage.password}</span>
        )}
        {type === 'register' && (
          <>
            <StyledInput
              type="password"
              autoComplete="new-password"
              className={
                form.passwordConfirm.length > 0 &&
                (isValid.passwordConfirm ? 'possible' : 'impossible')
              }
              name="passwordConfirm"
              placeholder="비밀번호 확인"
              value={form.passwordConfirm}
              onChange={onChange}
            />
            {!isValid.passwordConfirm && (
              <span className="invalid-message">
                {validMessage.passwordConfirm}
              </span>
            )}
            <StyledInput
              type="text"
              className={
                type === 'register' &&
                form.name.length > 0 &&
                (isValid.name ? 'possible' : 'impossible')
              }
              name="name"
              placeholder="활동명"
              value={form.name}
              onChange={onChange}
            />
            {type === 'register' && !isValid.name && (
              <span className="invalid-message">{validMessage.name}</span>
            )}
          </>
        )}
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <ButtonWithMarginTop cyan fullWidth>
          {text}
        </ButtonWithMarginTop>
      </form>
      {type === 'login' && (
        <div className="social-login">
          <hr />
          <GoogleLoginButton fullWidth indigo ref={googleLoginBtn}>
            <FontAwesomeIcon icon={faGoogle} />
            {` ${textMap.signinGoogle}`}
            <span> </span>
          </GoogleLoginButton>
          <NaverLoginButton transparent onClick={() => onNaverLoginClick()}>
            <img
              src={`${process.env.PUBLIC_URL}/images/auth/naver_login_btn.png`}
              alt="naver-login-btn"
            />
          </NaverLoginButton>
          <KakaoLoginButton transparent onClick={() => onKakaoLoginClick()}>
            <img
              src={`${process.env.PUBLIC_URL}/images/auth/kakao_login_btn.png`}
              alt="kakao-login-btn"
            />
          </KakaoLoginButton>
          <hr />
        </div>
      )}

      <Footer className="auth-link">
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
