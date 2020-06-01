import React from 'react';
import styled from 'styled-components';
import qs from 'qs';
import Button from './Button';

const PaginationBlock = styled.div`
  width: 320px;
  margin: 2rem auto;
  display: flex;
  justify-content: center;
  align-items: center;
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
  // 페이지 번호 그룹을 3개로 분할
  // 총 페이지 블록 개수 : endpointBlockCount + blockCount + 1(첫/마지막 페이지)
  const result = {
    front: [],
    mid: [],
    end: [],
  };
  // 전체 페이지의 중간지점을 기준으로 위치 설정
  // 해당되는 위치에 endpointBlockCount 값만큼 페이지 번호 할당, 반대편은 1개 할당(첫/마지막 페이지)
  const endpointSite = page <= lastPage / 2 ? 'first' : 'last';
  // 1. 전체 페이지 개수(lastPage)가 총 페이지 블록 개수보다 작으면 mid 위치에 페이지 블록 모두 삽입
  if (lastPage <= endpointBlockCount + blockCount + 1) {
    // 페이지 블록 모두 삽입
    for (let i = 1; i <= lastPage; i++) {
      result.mid.push(i);
    }
    // 양 끝 그룹 비활성화
    result.front = null;
    result.end = null;
    // 리턴
    return result;
  }
  // blockCount의 절반 값을 정수로 저장
  const halfBlockCount = parseInt(blockCount / 2);
  // 2. 현 페이지가 왼쪽 구역일 경우
  if (endpointSite === 'first') {
    // front: 왼쪽 구역 블록 삽입
    for (let i = 1; i <= endpointBlockCount; i++) {
      result.front.push(i);
    }
    /**
     * 현 페이지가 endpointBlockCount 보다 작으면
     * 이미 포함되었으므로 페이지 값을 endpointBlockCount + 1로 설정
     */
    if (page <= endpointBlockCount) {
      page = endpointBlockCount + 1;
    }
    // mid:
    // 2-1. 현 페이지를 기준으로 왼쪽 halfBlock이 endpointBlock와 겹치는 경우
    if (page - halfBlockCount <= endpointBlockCount) {
      // 겹치는 개수를 구한다
      let count = halfBlockCount;
      for (let i = page - 1; i > endpointBlockCount; i--) {
        result.mid.push(i);
        count--;
      }
      // 겹친 개수만큼 오른쪽 블록에 추가
      for (let i = page; i <= page + halfBlockCount + count; i++) {
        result.mid.push(i);
      }
    } else {
      // 그렇지 않으면 현 페이지를 중심으로 하여 blockCount만큼 페이지 블록 삽입
      for (let i = page - halfBlockCount; i <= page + halfBlockCount; i++) {
        result.mid.push(i);
      }
    }
    // end: 마지막 페이지 번호만 삽입
    result.end.push(lastPage);
  } else if (endpointSite === 'last') {
    // 오른쪽 구역일 경우
    // front: 첫 페이지 번호만 삽입
    result.front.push(1);
    // end: 오른쪽 구역 블록 삽입
    for (let i = 0; i < endpointBlockCount; i++) {
      result.end.push(lastPage - i);
    }
    /**
     * 현 페이지가 endpointBlockCount 보다 작으면
     * 이미 포함되었으므로 페이지 값을 endpointBlockCount + 1로 설정
     */
    if (page >= lastPage - endpointBlockCount + 1) {
      page = lastPage - endpointBlockCount;
    }
    // mid:
    // 2-1. 현 페이지를 기준으로 오른쪽 halfBlock이 endpointBlock와 겹치는 경우
    if (page + halfBlockCount >= lastPage - endpointBlockCount + 1) {
      // 겹치는 개수를 구한다
      let count = halfBlockCount;
      for (let i = page + 1; i < lastPage - endpointBlockCount + 1; i++) {
        result.mid.push(i);
        count--;
      }
      // 겹친 개수만큼 왼쪽 블록에 추가
      for (let i = page; i >= page - halfBlockCount - count; i--) {
        result.mid.push(i);
      }
    } else {
      // 그렇지 않으면 현 페이지를 중심으로 하여 blockCount만큼 페이지 블록 삽입
      for (let i = page - halfBlockCount; i <= page + halfBlockCount; i++) {
        result.mid.push(i);
      }
    }
  }
  // 3. 페이지 블록을 정렬
  result.front.sort((a, b) => a - b);
  result.mid.sort((a, b) => a - b);
  result.end.sort((a, b) => a - b);

  // 4. 각 그룹이 연결되면 mid로 병합
  if (result.front[result.front.length - 1] + 1 === result.mid[0]) {
    result.mid = result.front.concat(result.mid);
    result.front = null;
  }
  if (result.mid[result.mid.length - 1] + 1 === result.end[0]) {
    result.mid = result.mid.concat(result.end);
    result.end = null;
  }
  // 리턴
  return result;
};

const Pagination = ({ page, lastPage, username, tag }) => {
  const pageNumber = getPageNumber(page, lastPage);
  return (
    <PaginationBlock>
      {pageNumber.front &&
        pageNumber.front.map((number) => (
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
        pageNumber.mid.map((number) => (
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
        pageNumber.end.map((number) => (
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
