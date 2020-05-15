import React from 'react';
import styled from 'styled-components';

const ActivityBlock = styled.div`
  margin-top: 2rem;
  margin-left: 1rem;
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.text};

  .profile-info-group {
    display: flex;
    flex-direction: column;
    margin-bottom: 2rem;
  }
  .profile-info-title {
    font-weight: lighter;
    font-size: 1.5rem;
  }
  .profile-info-content {
    margin-top: 0.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .content-title {
    margin-right: 1rem;
    font-size: 1rem;
  }
  .content-value {
    padding: 0.25rem 0.5rem;
    font-size: 1rem;
    border-radius: 0.25rem;
    background-color: ${({ theme }) => theme.profileInfoValueBody};
  }
`;

const Activity = () => {
  return (
    <ActivityBlock>
      <div>
        <div className="profile-info-group">
          <span className="profile-info-title">POST</span>
          <div className="profile-info-content">
            <span className="content-title">발행한 블로그 포스트 개수</span>
            <span className="content-value">100</span>
          </div>
        </div>
        <div className="profile-info-group">
          <span className="profile-info-title">WIKI DOCUMENT</span>
          <div className="profile-info-content">
            <span className="content-title">발행한 위키 문서 개수</span>
            <span className="content-value">50</span>
          </div>
        </div>
      </div>
    </ActivityBlock>
  );
};

export default Activity;
