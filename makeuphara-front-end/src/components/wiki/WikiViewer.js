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
  a {
    padding: 0.25rem 0.75rem;
    border-left: 1px solid ${({ theme }) => theme.wikiMenuBorder};
    &:hover {
      background: ${({ theme }) => theme.wikiActionButtonHoverBody};
      color: ${({ theme }) => theme.hoverText};
    }
  }
`;

const DocumentMenu = () => {
  return (
    <>
      <Link to="#">편집</Link>
      <Link to="#">역사</Link>
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
`;

const BodyBlock = styled.div`
  margin: 1rem 0;
`;

const BodyTest = () => {
  return (
    <div>
      <p>메이크업베이스</p>
      <p>잘발림</p>
      <p>평점: 9/10</p>
      <p>긴문장테스트으으으으으으으으으으를하는중입니다</p>
    </div>
  );
};

const WikiViewer = () => {
  return (
    <WikiViewerBlock>
      <DocumentMenuBlock>
        <DocumentMenu />
      </DocumentMenuBlock>
      <DocumentBlock>
        <TitleBlock>
          <h2>이니스프리 메이크업 베이스 퍼플</h2>
          <p>최근 수정시각: {new Date().toLocaleString()}</p>
        </TitleBlock>
        <BodyBlock>
          <BodyTest />
        </BodyBlock>
      </DocumentBlock>
    </WikiViewerBlock>
  );
};

export default WikiViewer;
