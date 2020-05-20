import React from 'react';
import styled from 'styled-components';
import { ProfileBlock } from './Profile';
import Button from '../common/Button';

const SecurityBlock = styled(ProfileBlock)``;

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
    font-weight: lighter;
    color: ${({ theme }) => theme.hoverText};
  }
`;

const ButtonWithMarginTop = styled(Button)`
  margin-top: 0.5rem;
`;

const Security = () => {
  return (
    <SecurityBlock>
      <div>
        <form className="change-password-form">
          <div className="profile-info">
            <span className="profile-info-title">비밀번호 변경</span>
            <span className="profile-info-explain">
              비밀번호를 변경할 수 있습니다.
            </span>
            <PasswordInput type="password" placeholder="기존 비밀번호 입력" />
            <PasswordInput type="password" placeholder="변경할 비밀번호 입력" />
            <PasswordInput
              type="password"
              placeholder="변경할 비밀번호 한번 더 입력"
            />
          </div>
          <ButtonWithMarginTop themeColor fullWidth>
            비밀번호 변경
          </ButtonWithMarginTop>
        </form>
      </div>
    </SecurityBlock>
  );
};

export default Security;
