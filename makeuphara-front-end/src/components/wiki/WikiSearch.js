import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faSearch,
  faRandom,
  faArrowRight,
} from '@fortawesome/free-solid-svg-icons';

const WikiSearchBlock = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.wikiMenuBorder};
`;

const SearchBlock = styled.div`
  display: flex;
  flex: none;
  color: ${({ theme }) => theme.text};
  a {
    padding: 0.375rem 0.75rem;
    &:hover {
      color: ${({ theme }) => theme.hoverText};
      background: ${({ theme }) => theme.wikiActionButtonHoverBody};
    }
  }
  .action-button {
    display: flex;
    margin-left: auto;
  }
`;

const SearchInput = styled.input`
  padding: 0 0.75rem;
  border: none;
  border-left: 1px solid ${({ theme }) => theme.wikiMenuBorder};
  flex-grow: 1;
  outline: none;
  font-size: 0.875rem;
  background: ${({ theme }) => theme.body};
`;

const SearchButton = styled.button`
  background: ${({ theme }) => theme.body};
  outline: none;
  padding: 0.375rem 0.75rem;
  border: none;
  border-left: 1px solid ${({ theme }) => theme.wikiMenuBorder};
  color: ${({ theme }) => theme.text};
  &:hover {
    color: ${({ theme }) => theme.hoverText};
    background: ${({ theme }) => theme.wikiActionButtonHoverBody};
  }
`;

const WikiSearch = () => {
  library.add([faSearch, faRandom, faArrowRight]);
  return (
    <WikiSearchBlock>
      <SearchBlock>
        <Link to="#">
          <FontAwesomeIcon icon="random" />
        </Link>
        <SearchInput placeholder="Search" />
        <span className="action-button">
          <SearchButton>
            <FontAwesomeIcon icon="search" />
          </SearchButton>
          <SearchButton>
            <FontAwesomeIcon icon="arrow-right" />
          </SearchButton>
        </span>
      </SearchBlock>
    </WikiSearchBlock>
  );
};

export default WikiSearch;
