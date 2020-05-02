import React from 'react';
import styled from 'styled-components';
import Responsive from '../common/Responsive';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

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

const HistoryItem = ({ document }) => {
  const { title, publishedDate, revision } = document;
  return (
    <div className="item">
      <span className="item-date">
        {dayjs(publishedDate).format('YYYY-MM-DD HH:mm:ss')}
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
        <span className="error-msg">에러가 발생했습니다.</span>
      </WikiHistoryBlock>
    );
  }
  if (!historyList || loading) {
    return null;
  }

  return (
    <WikiHistoryBlock>
      <span className="title">
        <Link to="#">{docName}</Link>
        <span>(문서 역사)</span>
      </span>
      {historyList.map((document) => (
        <HistoryItem document={document} key={document._id} />
      ))}
    </WikiHistoryBlock>
  );
};

export default WikiHistory;
