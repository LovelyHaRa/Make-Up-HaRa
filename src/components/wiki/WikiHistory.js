import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import Responsive from '../common/Responsive';
import ErrorBlock from '../common/ErrorBlock';
import LoadingProgress from '../common/LoadingProgress';

/**
 * 위키 문서 역사 리스트 컴포넌트
 */

const WikiHistoryBlock = styled(Responsive)`
  background: ${({ theme }) => theme.body};
  color: ${({ theme }) => theme.text};
  display: flex;
  flex-direction: column;
  .title {
    margin: 1rem 0;
    font-size: 2rem;
    font-weight: 300;
    & > span {
      font-size: 1rem;
    }
  }
  .item {
    margin: 0.25rem 0;
  }
  .item .item-link {
    font-size: 0.8rem;
    margin-left: 0.5rem;
    color: ${({ theme }) => theme.wikiHistoryLinkText};
    &:hover {
      color: ${({ theme }) => theme.wikiHistoryLinkHoverText};
    }
  }
  .item .item-revision {
    font-weight: 700;
    margin-left: 3rem;
  }
`;

const HistoryErrorBlock = styled(ErrorBlock)`
  margin: 2rem;
`;

const HistoryItem = ({ document }) => {
  const { title, publishedDate, revision } = document;
  return (
    <div className="item">
      <span className="item-date">
        {format(new Date(publishedDate), 'yyyy-MM-dd HH:mm:ss')}
      </span>
      <Link to={`/w/${title.name}?r=${revision}`} className="item-link">
        (보기)
      </Link>
      <span className="item-revision">(r{revision})</span>
    </div>
  );
};

const WikiHistory = ({ historyList, error, loading, docName }) => {
  if (error) {
    return (
      <WikiHistoryBlock>
        <HistoryErrorBlock>
          <span className="error-title">히스토리 요청 실패.</span>
          <span>
            Status: <span className="error-msg">{error.response.status}</span>
          </span>
          <span>
            Message:{' '}
            <span className="error-msg">{error.response.statusText}</span>
          </span>
        </HistoryErrorBlock>
      </WikiHistoryBlock>
    );
  }
  if (!historyList || loading) {
    return <LoadingProgress customHeight={80} />;
  }

  return (
    <WikiHistoryBlock>
      <span className="title">
        <span>{docName}</span>
        <span>(문서 역사)</span>
      </span>
      {historyList.map((document) => (
        <HistoryItem document={document} key={document._id} />
      ))}
    </WikiHistoryBlock>
  );
};

export default WikiHistory;
