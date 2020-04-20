import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
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
    a {
      margin-left: 3rem;
      font-size: 0.9rem;
    }
  }
`;

const RequestItem = ({ name, id }) => {
  return (
    <div className="item">
      <span>{name}</span>
      <Link to={`/wiki/edit/${id}`}>작성하기</Link>
    </div>
  );
};

const WikiRequest = ({ requestList, error }) => {
  if (error) {
    return (
      <Responsive>
        <WikiRequestBlock>
          <span className="error-msg">에러가 발생했습니다.</span>
        </WikiRequestBlock>
      </Responsive>
    );
  }
  return (
    <Responsive>
      <WikiRequestBlock>
        <h2>작성이 필요한 문서</h2>
        {requestList.map(request => (
          <RequestItem name={request.name} id={request._id} />
        ))}
      </WikiRequestBlock>
    </Responsive>
  );
};

export default WikiRequest;
