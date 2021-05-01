import React from 'react';
import styled from 'styled-components';

/**
 * 검색 결과가 없는 경우에 사용할 컴포넌트
 */

const NoResultBlock = styled.div`
  margin: 3rem 2rem;
  display: flex;
  flex-direction: column;
  font-family: 'NanumBarunGothic';
  align-items: center;
  color: ${({ theme }) => theme.text};
  .title {
    font-size: 1.25rem;
    margin-bottom: 1rem;
  }
  .info {
    margin-top: 1rem;
    font-size: 1.25rem;
  }
  .query {
    color: ${({ theme }) => theme.categoryBorder};
    font-weight: 600;
  }
`;

const NoResult = ({ query }) => (
  <NoResultBlock>
    <span className="title">
      <span className="query">&apos;{query}&apos;</span>에 대한 검색 결과가
      없습니다.ㅠㅠ
    </span>
    <span className="info">다른 검색어를 검색해 보는건 어떨까요??</span>
  </NoResultBlock>
);

export default NoResult;
