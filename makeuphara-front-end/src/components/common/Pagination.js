import React from 'react';
import styled from 'styled-components';

import { getPageNumber } from '../../lib/util';
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
  span::before {
    content: '\\B7\\B7\\B7';
  }
`;

const PageLink = styled(Button)`
  width: 1rem;
  padding: 0.375rem;
  text-align: center;
  & + & {
    margin-left: 0.25rem;
  }
`;

const PageButton = styled(Button)`
  width: 1.5rem;
  padding: 0.375rem;
  text-align: center;
  & + & {
    margin-left: 0.25rem;
  }
`;

const buildLink = ({ path, query, page }) =>
  query.length > 0 ? `${path}?${query}&page=${page}` : `${path}?page=${page}`;

const Pagination = ({ path, query, page, lastPage }) => {
  const pageNumber = getPageNumber(page, lastPage);
  return (
    <PaginationBlock>
      {pageNumber.front &&
        pageNumber.front.map((number) => (
          <PageLink
            disabled={page === number}
            to={buildLink({ path, query, page: number })}
            key={number}
          >
            {number}
          </PageLink>
        ))}
      {pageNumber.front && <span className="page-skip" />}
      {pageNumber.mid &&
        pageNumber.mid.map((number) => (
          <PageLink
            disabled={page === number}
            to={buildLink({ path, query, page: number })}
            key={number}
          >
            {number}
          </PageLink>
        ))}
      {pageNumber.end && <span className="page-skip" />}
      {pageNumber.end &&
        pageNumber.end.map((number) => (
          <PageLink
            disabled={page === number}
            to={buildLink({ path, query, page: number })}
            key={number}
          >
            {number}
          </PageLink>
        ))}
    </PaginationBlock>
  );
};

export const AsyncPagination = ({ handleClick, page, lastPage }) => {
  const pageNumber = getPageNumber(page, lastPage);
  return (
    <PaginationBlock>
      {pageNumber.front &&
        pageNumber.front.map((number) => (
          <PageButton
            disabled={page === number}
            onClick={() => handleClick(number)}
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
            onClick={() => handleClick(number)}
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
            onClick={() => handleClick(number)}
            key={number}
          >
            {number}
          </PageButton>
        ))}
    </PaginationBlock>
  );
};

export default Pagination;
