import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import ErrorBlock from '../common/ErrorBlock';
import { Helmet } from 'react-helmet-async';

const WikiListBlock = styled.div`
  margin: 2rem;
  margin-top: 0;
  color: ${({ theme }) => theme.text};
`;

const WikiListErrorBlock = styled(ErrorBlock)`
  margin: 2rem;
`;

const DocumentBlock = styled.div`
  display: flex;
  align-items: center;
  border-top: 1px solid ${({ theme }) => theme.wikiBorder};
  padding: 0.5rem 0.25rem;
  &:first-of-type {
    border-top: none;
  }
  &:last-of-type {
    border-bottom: 1px solid ${({ theme }) => theme.wikiBorder};
  }
  &:hover {
    background: ${({ theme }) => theme.hoverList};
  }
  a {
    display: flex;
  }
  flex: none;
  .wiki-info {
    margin-left: auto;
    display: flex;
    align-items: center;
  }
`;

const DocumentItem = ({ document }) => {
  const { name } = document;
  return (
    <DocumentBlock>
      <Link to={`/w/${name}`}>{name}</Link>
      <div className="wiki-info"></div>
    </DocumentBlock>
  );
};

const WikiList = ({ documentList, error, loading }) => {
  if (error) {
    return (
      <WikiListErrorBlock>
        <span className="error-title">검색 결과 요청 실패.</span>
        <span>
          Status: <span className="error-msg">{error.response.status}</span>
        </span>
        <span>
          Message:{' '}
          <span className="error-msg">{error.response.statusText}</span>
        </span>
      </WikiListErrorBlock>
    );
  }
  if (loading || !documentList) {
    return null;
  }
  if (!loading && documentList && !documentList.length) {
    return (
      <WikiListErrorBlock>
        <span className="error-title">검색 결과가 없습니다.</span>
        <span className="error-title">
          다른 검색어를 입력해보는건 어떨까요???
        </span>
      </WikiListErrorBlock>
    );
  }
  return (
    <WikiListBlock>
      <Helmet>
        <title>WIKI LIST - MAKE UP HARA</title>
      </Helmet>
      {!loading && documentList && (
        <div>
          {documentList.map((document) => (
            <DocumentItem document={document} key={document._id} />
          ))}
        </div>
      )}
    </WikiListBlock>
  );
};

export default WikiList;
