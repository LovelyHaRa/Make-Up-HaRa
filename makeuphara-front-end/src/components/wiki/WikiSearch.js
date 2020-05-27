import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faSearch,
  faRandom,
  faArrowRight,
} from '@fortawesome/free-solid-svg-icons';

const WikiSearchBlock = styled.div`
  margin-top: 0.125rem;
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
  color: ${({ theme }) => theme.text};
`;

const SearchButton = styled.button`
  background: ${({ theme }) => theme.body};
  outline: none;
  padding: 0.375rem 0.75rem;
  border: none;
  border-left: 1px solid ${({ theme }) => theme.wikiMenuBorder};
  color: ${({ theme }) => theme.text};
  cursor: pointer;
  &:hover {
    color: ${({ theme }) => theme.hoverText};
    background: ${({ theme }) => theme.wikiActionButtonHoverBody};
  }
`;

const WikiSearch = ({ onChangeField, onSearch, onDirect, onShuffle }) => {
  library.add([faSearch, faRandom, faArrowRight]);

  const handleChange = (e) => {
    onChangeField({ key: 'query', value: e.target.value });
  };

  const handleKeyUp = (e) => {
    if (e.keyCode === 13) {
      return onSearch();
    }
  };

  return (
    <WikiSearchBlock>
      <SearchBlock>
        <SearchButton onClick={onShuffle}>
          <FontAwesomeIcon icon="random" />
        </SearchButton>
        <SearchInput
          onChange={handleChange}
          onKeyUp={handleKeyUp}
          placeholder="위키 문서 검색"
        />
        <span className="action-button">
          <SearchButton onClick={onSearch}>
            <FontAwesomeIcon icon="search" />
          </SearchButton>
          <SearchButton onClick={onDirect}>
            <FontAwesomeIcon icon="arrow-right" />
          </SearchButton>
        </span>
      </SearchBlock>
    </WikiSearchBlock>
  );
};

export default WikiSearch;
