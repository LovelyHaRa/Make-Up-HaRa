import React from 'react';
import styled from 'styled-components';
import Responsive from '../common/Responsive';

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
        <WikiRequestBlock>
          <span className="error-msg">에러가 발생했습니다.</span>
        </WikiRequestBlock>
      </Responsive>
    );
  }
  if (!requestList || loading) {
    return null;
  }
  return (
    <Responsive>
      <WikiRequestBlock>
        <h2>작성이 필요한 문서</h2>
        {requestList.map(request => (
          <RequestItem title={request} onEdit={onEdit} key={request._id} />
        ))}
      </WikiRequestBlock>
    </Responsive>
  );
};

export default WikiRequest;
