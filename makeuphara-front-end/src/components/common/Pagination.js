import React from 'react';
import styled from 'styled-components';
import qs from 'qs';
import Button from './Button';

const PaginationBlock = styled.div`
  width: 320px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 2rem;
  span {
    margin: 0 0.25rem;
    color: ${({ theme }) => theme.text};
  }
  span:before {
    content: '\\B7\\B7\\B7';
  }
`;

const PageButton = styled(Button)`
  width: 1rem;
  padding: 0.375rem;
  text-align: center;
  & + & {
    margin-left: 0.25rem;
  }
`;

const buildLink = ({ username, tag, page }) => {
  const query = qs.stringify({ tag, page });
  return username ? `/blog/@${username}?${query}` : `/blog/?${query}`;
};

/* CONFIG */
const endpointBlockCount = 3;
const blockCount = 5;

/* 페이지 번호를 저장한 배열을 구하는 함수 */
const getPageNumber = (page, lastPage) => {
  const endpointSite = page <= lastPage / 2 ? 'first' : 'last';
  const result = {
    front: [],
    mid: [],
    end: [],
  };
  if (lastPage <= endpointBlockCount + blockCount + 1) {
    for (let i = 1; i <= lastPage; i++) {
      result.mid.push(i);
    }
    result.front = null;
    result.end = null;
    return result;
  }
  const halfBlockCount = parseInt(blockCount / 2);
  if (endpointSite === 'first') {
    for (let i = 1; i <= endpointBlockCount; i++) {
      result.front.push(i);
    }
    if (page <= endpointBlockCount) {
      page = endpointBlockCount + 1;
    }
    if (page - halfBlockCount <= endpointBlockCount) {
      let count = halfBlockCount;
      for (let i = page - 1; i > endpointBlockCount; i--) {
        result.mid.push(i);
        count--;
      }
      for (let i = page; i <= page + halfBlockCount + count; i++) {
        result.mid.push(i);
      }
    } else {
      for (let i = page - halfBlockCount; i <= page + halfBlockCount; i++) {
        result.mid.push(i);
      }
    }
    result.end.push(lastPage);
  } else if (endpointSite === 'last') {
    result.front.push(1);
    for (let i = 0; i < endpointBlockCount; i++) {
      result.end.push(lastPage - i);
    }
    if (page >= lastPage - endpointBlockCount + 1) {
      page = lastPage - endpointBlockCount;
    }
    if (page + halfBlockCount >= lastPage - endpointBlockCount + 1) {
      let count = halfBlockCount;
      for (let i = page + 1; i < lastPage - endpointBlockCount + 1; i++) {
        result.mid.push(i);
        count--;
      }
      for (let i = page; i >= page - halfBlockCount - count; i--) {
        result.mid.push(i);
      }
    } else {
      for (let i = page - halfBlockCount; i <= page + halfBlockCount; i++) {
        result.mid.push(i);
      }
    }
  }
  result.front.sort((a, b) => a - b);
  result.mid.sort((a, b) => a - b);
  result.end.sort((a, b) => a - b);

  if (result.front[result.front.length - 1] + 1 === result.mid[0]) {
    result.mid = result.front.concat(result.mid);
    result.front = null;
  }
  if (result.mid[result.mid.length - 1] + 1 === result.end[0]) {
    result.mid = result.mid.concat(result.end);
    result.end = null;
  }
  return result;
};

const Pagination = ({ page, lastPage, username, tag }) => {
  const pageNumber = getPageNumber(page, lastPage);
  return (
    <PaginationBlock>
      {pageNumber.front &&
        pageNumber.front.map(number => (
          <PageButton
            disabled={page === number}
            to={buildLink({ username, tag, page: number })}
            key={number}
          >
            {number}
          </PageButton>
        ))}
      {pageNumber.front && <span />}
      {pageNumber.mid &&
        pageNumber.mid.map(number => (
          <PageButton
            disabled={page === number}
            to={buildLink({ username, tag, page: number })}
            key={number}
          >
            {number}
          </PageButton>
        ))}
      {pageNumber.end && <span />}
      {pageNumber.end &&
        pageNumber.end.map(number => (
          <PageButton
            disabled={page === number}
            to={buildLink({ username, tag, page: number })}
            key={number}
          >
            {number}
          </PageButton>
        ))}
    </PaginationBlock>
  );
};

export default Pagination;
