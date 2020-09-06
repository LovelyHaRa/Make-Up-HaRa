import React from 'react';
import styled from 'styled-components';
import Button from '../common/Button';
import ErrorBlock from '../common/ErrorBlock';

/**
 * 프로필 컴포넌트
 * 기능: 이름 변경
 */

export const ProfileBlock = styled.div`
  margin-top: 2rem;
  margin-left: 1rem;
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.text};

  .profile-info {
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;
  }
  .profile-info-title {
    font-weight: 300;
    font-size: 1.5rem;
    font-family: 'Raleway', 'NanumGothic';
  }
  .profile-info-explain {
    font-size: 1rem;
    font-family: 'NanumGothic';
    margin-top: 0.25rem;
    color: ${({ theme }) => theme.categoryBorder};
  }
  .profile-info-value {
    margin-top: 1.25rem;
    span {
      padding: 0.25rem 0.5rem;
      font-size: 1.125rem;
      font-family: 'Raleway', 'NanumGothic';
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
  .possible {
    border: 2px solid ${({ theme }) => theme.profileInputValid};
  }
  .impossible {
    border: 2px solid ${({ theme }) => theme.profileInputInValid};
  }
  .invalid-message {
    font-weight: 300;
    color: ${({ theme }) => theme.errorText};
    margin-top: 0.5rem;
  }
  .success-message {
    font-weight: 300;
    color: ${({ theme }) => theme.categoryBorder};
    margin-top: 0.5rem;
  }
`;

const StyleInput = styled.input`
  margin-top: 1.25rem;
  padding: 0.5rem 0.75rem;
  font-size: 1.125rem;
  font-family: 'Raleway', 'NanumGothic';
  border-radius: 0.25rem;
  background-color: ${({ theme }) => theme.profileInfoValueBody};
  color: ${({ theme }) => theme.text};
  outline: none;
  border: 2px solid ${({ theme }) => theme.body};
`;

const ProfileSubmitButton = styled(Button)`
  margin-top: 0.5rem;
`;

export const ProfileErrorBlock = styled(ErrorBlock)`
  margin: 2rem;
`;

const Profile = ({
  user,
  form,
  onChange,
  onSubmit,
  isValid,
  validMessage,
  resultMessage,
}) => {
  if (!user) {
    return (
      <ProfileErrorBlock>
        <span className="error-title">로그인 정보가 없어요...ㅠ</span>
      </ProfileErrorBlock>
    );
  }
  const { username, provider } = user;
  const { existName: isExistValid, equalName: isEqualValid } = isValid;
  const { existName: validNameMessage } = validMessage;
  const { submit: submitMessage, error: errorMessage } = resultMessage;
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
        <form className="profile-form" onSubmit={onSubmit}>
          <div className="profile-info">
            <span className="profile-info-title">DISPLAY NAME</span>
            <span className="profile-info-explain">
              다른 사용자들에게 보여지는 이름입니다.
            </span>
            <StyleInput
              type="text"
              name="name"
              className={
                !isEqualValid &&
                (isExistValid === true ? 'possible' : 'impossible')
              }
              value={form.name ? form.name : ''}
              onChange={onChange}
            />
            {isExistValid === false && (
              <span className="invalid-message">{validNameMessage}</span>
            )}
            {submitMessage !== '' && (
              <span className="success-message">{submitMessage}</span>
            )}
            {errorMessage !== '' && (
              <span className="invalid-message">{errorMessage}</span>
            )}
          </div>
          <ProfileSubmitButton
            themeColor
            fullWidth
            disabled={!isExistValid || isEqualValid}
          >
            수정
          </ProfileSubmitButton>
        </form>
      </div>
    </ProfileBlock>
  );
};

export default Profile;
