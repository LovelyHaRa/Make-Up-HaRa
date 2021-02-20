import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import ErrorBlock from '../common/ErrorBlock';

/**
 * 최근 변경된 위키문서 리스트
 */

const WikiSectionBlock = styled.div`
  margin: 2rem;
  color: ${({ theme }) => theme.text};
  h3 {
    font-family: 'NanumBarunGothic';
    font-weight: 600;
  }
  & > span {
    display: flex;
    justify-content: flex-end;
    margin-top: 0.5rem;
    & > a:hover {
      color: ${({ theme }) => theme.hoverText};
    }
  }
  .footer {
    font-family: 'Raleway';
  }
`;

const SectionErrorBlock = styled(ErrorBlock)`
  margin-top: 2rem;
  margin-left: 2rem;
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
  const { title, publishedDate } = document;
  const { name } = title;
  return (
    <DocumentBlock>
      <Link to={`/w/${name}`}>{name}</Link>
      <div className="wiki-info">
        <span>{format(new Date(publishedDate), 'yyyy-MM-dd')}</span>
      </div>
    </DocumentBlock>
  );
};

const WikiSection = ({ documentList, loading, error }) => {
  if (error) {
    return (
      <SectionErrorBlock>
        <span className="error-title">WIKI 리스트 요청 실패.</span>
        <span className="error-msg">ERROR MESSAGE: {error.message}</span>
      </SectionErrorBlock>
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

      <span className="footer">
        <Link to="/wiki/list">MORE WIKI..</Link>
      </span>
    </WikiSectionBlock>
  );
};

export default WikiSection;
