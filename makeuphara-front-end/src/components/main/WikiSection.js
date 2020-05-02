import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

const WikiSectionBlock = styled.div`
  h3 {
    font-weight: 500;
  }
  & > span {
    display: flex;
    justify-content: flex-end;
    margin-top: 0.5rem;
    & > a:hover {
      color: ${({ theme }) => theme.hoverText};
    }
  }
`;

const DocumentBlock = styled.div`
  display: flex;
  align-items: center;
  border-top: 1px solid ${({ theme }) => theme.wikiBorder};
  padding: 0.5rem 0.25rem;
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
  const { title, publishedDate } = document;
  const { name } = title;
  return (
    <DocumentBlock>
      <Link to={`/w/${name}`}>{name}</Link>
      <div className="wiki-info">
        <span>{dayjs(publishedDate).format('YYYY-MM-DD')}</span>
      </div>
    </DocumentBlock>
  );
};

const WikiSection = ({ documentList, loading, error }) => {
  if (error) {
    return (
      <WikiSectionBlock>
        <span className="title">에러가 발생했습니다.</span>
      </WikiSectionBlock>
    );
  }
  return (
    <WikiSectionBlock>
      <h3>최근 변경된 위키 문서</h3>
      {!loading && documentList && (
        <div>
          {documentList.map((document) => (
            <DocumentItem document={document} key={document._id} />
          ))}
        </div>
      )}

      <span>
        <Link to="/wiki/list">MORE WIKI...</Link>
      </span>
    </WikiSectionBlock>
  );
};

export default WikiSection;
