import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import moment from 'moment';

/**
 * 위키 검색결과
 */

const WikiSearchResultBlock = styled.div`
  margin: 1rem 2rem;
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
        <span>{moment(updateDate).format('YYYY-MM-DD')}</span>
      </div>
    </DocumentBlock>
  );
};

const WikiSearchResult = ({
  includeTitle,
  wikiList,
  wikiListLoading,
  wikiListError,
}) => {
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
        </>
      )}
    </WikiSearchResultBlock>
  );
};

export default WikiSearchResult;
