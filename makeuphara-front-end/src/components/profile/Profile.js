import React from 'react';
import styled from 'styled-components';
import Button from '../common/Button';

export const ProfileBlock = styled.div`
  margin-top: 2rem;
  margin-left: 1rem;
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.text};

  .profile-info {
    display: flex;
    flex-direction: column;
    margin-bottom: 2rem;
  }
  .profile-info-title {
    font-weight: lighter;
    font-size: 1.5rem;
  }
  .profile-info-explain {
    font-weight: lighter;
    font-size: 1rem;
    margin-top: 0.25rem;
    color: ${({ theme }) => theme.categoryBorder};
  }
  .profile-info-value {
    margin-top: 1.25rem;
    span {
      padding: 0.25rem 0.5rem;
      font-size: 1.125rem;
      border-radius: 0.25rem;
      background-color: ${({ theme }) => theme.profileInfoValueBody};
    }
  }
  hr {
    border: 0.5px solid ${({ theme }) => theme.categoryBorder};
  }
  .profile-form {
    margin: 1.5rem 0;
    display: flex;
    flex-direction: column;
  }
  .value-provider {
    text-transform: uppercase;
  }
`;

const StyleInput = styled.input`
  margin-top: 1.25rem;
  padding: 0.5rem 0.75rem;
  font-size: 1.125rem;
  border-radius: 0.25rem;
  background-color: ${({ theme }) => theme.profileInfoValueBody};
  color: ${({ theme }) => theme.text};
  outline: none;
  border: none;
`;

const ButtonWithMarginTop = styled(Button)`
  margin-top: 1.5rem;
`;

const Profile = ({ user }) => {
  if (!user) {
    return null;
  }
  const { username, provider, name } = user;
  return (
    <ProfileBlock>
      <div>
        <div className="profile-info">
          <span className="profile-info-title">ID</span>
          <div className="profile-info-value">
            <span>{username}</span>
          </div>
        </div>
        <div className="profile-info">
          <span className="profile-info-title">로그인 유형</span>
          <span className="profile-info-explain">
            어떤 방식으로 로그인했는지를 확인합니다.
          </span>
          <div className="profile-info-value">
            <span className="value-provider">{provider}</span>
          </div>
        </div>
        <hr />
        <form className="profile-form">
          <div className="profile-info">
            <span className="profile-info-title">DISPLAY NAME</span>
            <span className="profile-info-explain">
              다른 사용자들에게 보여지는 이름입니다.
            </span>
            <StyleInput value={name} />
          </div>
          <ButtonWithMarginTop themeColor fullWidth>
            수정
          </ButtonWithMarginTop>
        </form>
      </div>
    </ProfileBlock>
  );
};

export default Profile;
