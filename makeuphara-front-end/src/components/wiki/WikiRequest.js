import React from 'react';
import styled from 'styled-components';
import Responsive from '../common/Responsive';
import ErrorBlock from '../common/ErrorBlock';
import LoadingProgress from '../common/LoadingProgress';

/**
 * 작성 가능한 위키 문서 목록 컴포넌트
 */

const WikiRequestBlock = styled.div`
  background: ${({ theme }) => theme.body};
  color: ${({ theme }) => theme.text};
  h2 {
    font-weight: 500;
    margin-top: 1rem;
    margin-bottom: 2rem;
  }
  .item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;
    button {
      padding: 0.25rem 0.5rem;
      margin-left: 3rem;
      border: none;
      outline: none;
      font-size: 0.875rem;
      cursor: pointer;
      color: ${({ theme }) => theme.wikiActionButtonText};
      background: ${({ theme }) => theme.wikiActionButtonBody};
      &:hover {
        color: ${({ theme }) => theme.wikiActionButtonHoverText};
        background: ${({ theme }) => theme.wikiActionButtonHoverBody};
      }
    }
  }
`;

const WikiRequestErrorBlock = styled(ErrorBlock)`
  margin-top: 3rem;
  align-items: center;
  justify-content: center;
`;

const RequestItem = ({ title, onEdit }) => {
  const { name } = title;
  return (
    <div className="item">
      <span>{name}</span>
      <button onClick={() => onEdit(title)}>작성하기</button>
    </div>
  );
};

const WikiRequest = ({ requestList, loading, error, onEdit }) => {
  if (error) {
    return (
      <Responsive>
        <WikiRequestErrorBlock>
          <span className="error-title">리스트 요청 실패.</span>
          <span className="error-msg">Status: {error.response.status}</span>
          <span className="error-msg">
            Message: {error.response.statusText}
          </span>
        </WikiRequestErrorBlock>
      </Responsive>
    );
  }
  if (!requestList || loading) {
    return <LoadingProgress body />;
  }
  if (!requestList.length) {
    return (
      <Responsive>
        <WikiRequestErrorBlock>
          <span className="error-title">
            지금 작성이 필요한 문서가 없습니다...ㅠ
          </span>
        </WikiRequestErrorBlock>
      </Responsive>
    );
  }
  return (
    <Responsive>
      <WikiRequestBlock>
        <h2>작성이 필요한 문서</h2>
        {requestList.map((request) => (
          <RequestItem title={request} onEdit={onEdit} key={request._id} />
        ))}
      </WikiRequestBlock>
    </Responsive>
  );
};

export default WikiRequest;
