import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import ErrorBlock from '../common/ErrorBlock';

/**
 * 위키 검색결과
 */

const WikiSearchResultBlock = styled.div`
  margin: 1rem 2rem;
  display: flex;
  flex-direction: column;
  .title {
    font-size: 1.25rem;
    font-family: 'NanumBarunGothic';
    font-weight: 600;
    color: ${({ theme }) => theme.text};
  }
  & > span {
    display: flex;
    margin-top: 0.5rem;
    & > a:hover {
      color: ${({ theme }) => theme.hoverText};
    }
  }
  .wiki-list {
    margin: 1rem 0;
  }
  .footer {
    margin: 0.5rem 0;
    font-family: 'NanumBarunGothic';
    text-align: right;
    &:hover {
      color: ${({ theme }) => theme.hoverText};
    }
  }
`;

const DocumentBlock = styled.div`
  display: flex;
  align-items: center;
  border-top: 1px solid ${({ theme }) => theme.wikiBorder};
  padding: 0.5rem 0.25rem;
  font-family: 'NanumBarunGothic';
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
  const { name, updateDate } = document;
  return (
    <DocumentBlock>
      <Link to={`/w/${name}`}>{name}</Link>
      <div className="wiki-info">
        <span>{format(new Date(updateDate), 'yyyy-MM-dd')}</span>
      </div>
    </DocumentBlock>
  );
};

const WikiSearchResultErrorBlock = styled(ErrorBlock)`
  margin: 2rem;
`;

const WikiSearchResult = ({
  includeTitle,
  query,
  wikiList,
  wikiListLoading,
  error,
}) => {
  if (error) {
    return (
      <WikiSearchResultErrorBlock>
        <span className="error-title">위키 검색 결과 요청 실패.</span>
        <span>
          Status: <span className="error-msg">{error.response.status}</span>
        </span>
        <span>
          Message:{' '}
          <span className="error-msg">{error.response.statusText}</span>
        </span>
      </WikiSearchResultErrorBlock>
    );
  }
  if (wikiList && wikiList.length === 0) {
    return null;
  }
  return (
    <WikiSearchResultBlock>
      {!wikiListLoading && wikiList && (
        <>
          {includeTitle && <span className="title">위키</span>}
          <div className="wiki-list">
            {wikiList.map((document) => (
              <DocumentItem document={document} key={document._id} />
            ))}
          </div>
          {includeTitle && (
            <Link to={`/search?wiki=true&query=${query}`} className="footer">
              위키 검색결과 더 보기...
            </Link>
          )}
        </>
      )}
    </WikiSearchResultBlock>
  );
};

export default WikiSearchResult;
