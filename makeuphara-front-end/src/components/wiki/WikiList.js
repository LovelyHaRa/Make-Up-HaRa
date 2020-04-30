import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const WikiListBlock = styled.div`
  margin: 2rem;
  margin-top: 0;
  color: ${({ theme }) => theme.text};
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
      <WikiListBlock>
        <span>에러가 발생했습니다.</span>
      </WikiListBlock>
    );
  }
  return (
    <WikiListBlock>
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
