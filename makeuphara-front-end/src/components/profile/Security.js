import React from 'react';
import styled from 'styled-components';
import { ProfileBlock, ProfileErrorBlock } from './Profile';
import Button from '../common/Button';

const SecurityBlock = styled(ProfileBlock)`
  .password-input-section {
    display: flex;
    flex-direction: column;
  }
  .change-password-result {
    margin: 1rem 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const PasswordInput = styled.input`
  margin-top: 1.25rem;
  padding: 0.5rem 0.75rem;
  font-size: 1rem;
  border-radius: 0.25rem;
  background-color: ${({ theme }) => theme.profileInfoValueBody};
  color: ${({ theme }) => theme.text};
  outline: none;
  border: 2px solid ${({ theme }) => theme.body};
  width: 20rem;
  &::placeholder {
    font-family: 'NanumGothic';
    color: ${({ theme }) => theme.hoverText};
  }
`;

const ButtonWithMarginTop = styled(Button)`
  margin-top: 0.5rem;
`;

const Security = ({
  user,
  form,
  onChange,
  valid,
  validMessage,
  onSubmit,
  submitPassword,
}) => {
  if (!user) {
    return (
      <ProfileErrorBlock>
        <span className="error-title">로그인 정보가 없어요...ㅠ</span>
      </ProfileErrorBlock>
    );
  }
  const { curPassword, newPassword, confirmPassword } = form;
  const {
    curPassword: validCur,
    newPassword: validNew,
    confirmPassword: validConfirm,
  } = valid;
  const {
    curPassword: validMessageCur,
    newPassword: validMessageNew,
    confirmPassword: validMessageConfirm,
  } = validMessage;
  const { result, message } = submitPassword;
  const { username } = user ? user : '';
  return (
    <SecurityBlock>
      <div>
        <form className="change-password-form" onSubmit={onSubmit}>
          <div className="profile-info">
            <span className="profile-info-title">비밀번호 변경</span>
            <span className="profile-info-explain">
              비밀번호를 변경할 수 있습니다.
            </span>
            <div className="password-input-section">
              <PasswordInput
                type="password"
                name="curPassword"
                autoComplete="new-password"
                placeholder="기존 비밀번호 입력"
                className={validCur === true ? 'possible' : 'impossible'}
                value={curPassword}
                onChange={onChange}
              />
              {validMessageCur !== '' && (
                <span className="invalid-message">{validMessageCur}</span>
              )}
            </div>
            <div className="password-input-section">
              <PasswordInput
                type="password"
                name="newPassword"
                autoComplete="new-password"
                placeholder="변경할 비밀번호 입력"
                className={validNew === true ? 'possible' : 'impossible'}
                value={newPassword}
                onChange={onChange}
              />
              {validMessageNew !== '' && (
                <span className="invalid-message">{validMessageNew}</span>
              )}
            </div>
            <div className="password-input-section">
              <PasswordInput
                type="password"
                name="confirmPassword"
                autoComplete="new-password"
                placeholder="변경할 비밀번호 한번 더 입력"
                className={validConfirm === true ? 'possible' : 'impossible'}
                value={confirmPassword}
                onChange={onChange}
              />
              {validMessageConfirm !== '' && (
                <span className="invalid-message">{validMessageConfirm}</span>
              )}
            </div>
            <input
              type="hidden"
              name="username"
              value={username ? username : ''}
            />
          </div>
          <div className="change-password-result">
            {message !== '' && result && (
              <span className="success-message">{message}</span>
            )}
            {message !== '' && !result && (
              <span className="invalid-message">{message}</span>
            )}
          </div>
          <ButtonWithMarginTop
            themeColor
            fullWidth
            disabled={!validCur || !validNew || !validConfirm}
          >
            비밀번호 변경
          </ButtonWithMarginTop>
        </form>
      </div>
    </SecurityBlock>
  );
};

export default Security;
