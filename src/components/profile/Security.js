import React from 'react';
import styled from 'styled-components';
import { ProfileBlock, ProfileErrorBlock } from './Profile';
import Button from '../common/Button';

/**
 * 보안 컴포넌트
 * 기능: 비밀번호 변경
 */

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
  isValid,
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
    curPassword: isCurValid,
    newPassword: isNewValid,
    confirmPassword: isConfirmValid,
  } = isValid;
  const {
    curPassword: validCurMessage,
    newPassword: validNewMessage,
    confirmPassword: validConfirmMessage,
  } = validMessage;
  const { result, message } = submitPassword;
  const { username } = user || '';
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
                className={isCurValid === true ? 'possible' : 'impossible'}
                value={curPassword}
                onChange={onChange}
              />
              {validCurMessage && (
                <span className="invalid-message">{validCurMessage}</span>
              )}
            </div>
            <div className="password-input-section">
              <PasswordInput
                type="password"
                name="newPassword"
                autoComplete="new-password"
                placeholder="변경할 비밀번호 입력"
                className={isNewValid === true ? 'possible' : 'impossible'}
                value={newPassword}
                onChange={onChange}
              />
              {validNewMessage && (
                <span className="invalid-message">{validNewMessage}</span>
              )}
            </div>
            <div className="password-input-section">
              <PasswordInput
                type="password"
                name="confirmPassword"
                autoComplete="new-password"
                placeholder="변경할 비밀번호 한번 더 입력"
                className={isConfirmValid === true ? 'possible' : 'impossible'}
                value={confirmPassword}
                onChange={onChange}
              />
              {validConfirmMessage && (
                <span className="invalid-message">{validConfirmMessage}</span>
              )}
            </div>
            <input type="hidden" name="username" value={username || ''} />
          </div>
          <div className="change-password-result">
            {result && message && (
              <span className="success-message">{message}</span>
            )}
            {!result && message && (
              <span className="invalid-message">{message}</span>
            )}
          </div>
          <ButtonWithMarginTop
            themeColor
            fullWidth
            disabled={!isCurValid || !isNewValid || !isConfirmValid}
          >
            변경
          </ButtonWithMarginTop>
        </form>
      </div>
    </SecurityBlock>
  );
};

export default Security;
