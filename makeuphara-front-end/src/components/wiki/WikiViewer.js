import React from 'react';
import styled from 'styled-components';
import Responsive from '../common/Responsive';
import { Link } from 'react-router-dom';

const WikiViewerBlock = styled.div``;

const DocumentMenuBlock = styled.div`
  display: flex;
  justify-content: flex-end;
  background: ${({ theme }) => theme.body};
  color: ${({ theme }) => theme.text};
  border-bottom: 1px solid ${({ theme }) => theme.wikiMenuBorder};
  button,
  a {
    padding: 0.25rem 0.75rem;
    outline: none;
    border: none;
    border-left: 1px solid ${({ theme }) => theme.wikiMenuBorder};
    cursor: pointer;
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    &:hover {
      background: ${({ theme }) => theme.wikiActionButtonHoverBody};
      color: ${({ theme }) => theme.hoverText};
    }
  }
  a {
    padding-top: 0.3rem;
    font-size: 0.8rem;
    align-items: center;
  }
  li {
    list-style: square !important;
  }
`;

const DocumentMenu = ({ onEdit, docName }) => {
  return (
    <>
      <button>코드 등록</button>
      <button onClick={onEdit}>편집</button>
      <Link to={`/wiki/history/${docName}`}>역사</Link>
    </>
  );
};

const DocumentBlock = styled(Responsive)`
  margin: 1rem auto;
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.text};
`;

const TitleBlock = styled.div`
  h2 {
    font-weight: 500;
  }
  p {
    text-align: right;
  }
  hr {
    background: ${({ theme }) => theme.wikiMenuBorder};
    border: 0;
    height: 1px;
  }
`;

const BodyBlock = styled.div`
  margin: 1rem 0;
`;

const DocumentContent = styled.div`
  color: ${({ theme }) => theme.text};
  p {
    margin-top: 0.25rem;
    margin-bottom: 0.25rem;
  }
  .ql-video {
    margin: 0 1%;
    width: 98%;
    height: 570px;
  }
  .ql-align-left {
    text-align: left;
  }
  .ql-align-center {
    text-align: center;
  }
  .ql-align-right {
    text-align: right;
  }
  @media screen and (max-width: 1024px) {
    .ql-video {
      height: 400px;
    }
  }
`;

const WikiViewer = ({ document, error, loading, onEdit, docName }) => {
  if (error) {
    if (error.response && error.response.status === 404) {
      return (
        <WikiViewerBlock>
          <DocumentBlock>
            <TitleBlock>
              <h2>{docName}</h2>
            </TitleBlock>
            <DocumentContent>존재하지 않는 위키 문서입니다.</DocumentContent>
          </DocumentBlock>
        </WikiViewerBlock>
      );
    } else {
      return (
        <BodyBlock>
          <DocumentContent>
            Status {error.response.status}: {error.response.statusText}
          </DocumentContent>
        </BodyBlock>
      );
    }
  }

  if (loading || !document) {
    return null;
  }
  const { title, body, publishedDate } = document;

  return (
    <WikiViewerBlock>
      <DocumentMenuBlock>
        <DocumentMenu onEdit={onEdit} docName={docName} />
      </DocumentMenuBlock>
      <DocumentBlock>
        <TitleBlock>
          <h2>{title && title.name}</h2>
          <p>최근 수정시각: {new Date(publishedDate).toLocaleString()}</p>
          <hr />
        </TitleBlock>
        <BodyBlock>
          <DocumentContent dangerouslySetInnerHTML={{ __html: body }} />
        </BodyBlock>
      </DocumentBlock>
    </WikiViewerBlock>
  );
};

export default WikiViewer;
