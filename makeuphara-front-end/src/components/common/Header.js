import React, { useState } from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/open-color';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSearch, faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import Button from './Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

const HeaderBlock = styled.nav`
  position: fixed;
  width: 100%;
  background: ${palette.gray[9]};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  & > div {
    display: flex;
  }
  .header-mid {
    justify-content: center;
    align-items: center;
  }
  .header-right {
    justify-content: center;
    align-items: center;
  }
  .logo {
    margin-left: 0.25rem;
    margin-right: 0.25rem;
    font-size: 1rem;
    letter-spacing: 0.5px;
    color: #fff;
  }
  .menu {
    color: #fff;
    display: flex;
    align-items: center;
  }
  .menu div > a:hover {
    color: ${palette.gray[3]};
  }
  @media screen and (max-width: 500px) {
    .main-menu {
      display: none;
    }
    .all-menu p {
      margin: 0.5rem 0.5rem 0;
      color: ${palette.gray[5]};
      font-weight: 600;
    }
    .all-menu li {
      margin: 0;
      padding: 0.25rem 0.5rem;
    }
  }
  @media screen and (min-width: 501px) {
    .all-menu {
      display: none;
    }
  }
  .btn-sign-in {
    margin-right: 0.5rem;
    margin-left: 1rem;
  }
  .dropdown {
    position: fixed;
    z-index: 100;
  }
  .dropdown.etc {
    width: 10rem;
    top: 2.5rem;
    background: #fff;
    color: #000;
    border: none;
    border-radius: 3px;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.15);
    font-size: 0.9rem;
  }
  .dropdown.etc hr {
    margin: 0 0.25rem;
    border: 0;
    height: 0.5px;
    background: ${palette.gray[5]};
  }
  .dropdown.etc ul {
    padding: 0.5rem 0.25rem;
    margin: 0;
  }
  .dropdown.etc > ul li:first-of-type {
    margin-top: 0;
  }
  .dropdown.etc > ul li {
    margin-top: 0.25rem;
    padding: 0.5rem;
  }
  .dropdown.etc > ul li:last-of-type {
    margin-bottom: 0;
  }
  .dropdown.etc li:hover {
    background: ${palette.gray[2]};
  }
  .dropdown.dropdown-search-input {
    display: flex;
    top: 2.75rem;
    right: 6.625rem;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.55);
  }
`;

const Menu = styled.div`
  &:first-child {
    margin-left: 1rem;
  }
  & + & {
    margin-left: 1rem;
  }
  &:last-child {
    margin-right: 1rem;
  }
`;
const SearchResponsive = styled.div`
  @media screen and (min-width: 769px) {
    .search-input {
      display: flex;
    }
    .search-btn {
      display: none;
    }
  }
  @media screen and (max-width: 768px) {
    .search-input {
      display: none;
    }
    .search-btn {
      display: inherit;
      color: ${palette.gray[0]};
      margin: 0 0.5rem;
    }
    .search-btn > a:hover {
      color: ${palette.gray[5]};
    }
  }
`;

const SearchInputWrapper = styled.div`
  height: 2rem;
  box-sizing: border-box;
  display: flex;
  align-items: center;
`;
const SearchInput = styled.input`
  height: 1.875rem;
  border: none;
  border-top-left-radius: 3px;
  border-bottom-left-radius: 3px;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  background: ${palette.gray[7]};
  color: ${palette.gray[1]};
  &::placeholder {
    color: ${palette.gray[2]};
  }
  &:focus {
    outline: 2px solid ${palette.indigo[9]};
  }
`;
const SearchBtn = styled(Link)`
  width: 2rem;
  height: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${palette.gray[8]};
  border-top-right-radius: 3px;
  border-bottom-right-radius: 3px;
  &:hover {
    background: ${palette.gray[6]};
  }
`;

const EtcDropDown = ({ state }) => {
  return (
    state && (
      <div className="dropdown etc">
        <div className="all-menu">
          <p>MAIN MENU</p>
          <ul>
            <Link to="/search">
              <li>Search</li>
            </Link>
            <Link to="/">
              <li>blog</li>
            </Link>
          </ul>
          <hr />
        </div>
        <ul>
          <Link to="/todo">
            <li>TODO</li>
          </Link>
          <li>테스트2</li>
          <li>테스트3</li>
          <li>테스트4</li>
          <li>테스트5</li>
        </ul>
      </div>
    )
  );
};

const SearchDropDown = ({ state }) => {
  return state && <SearchInputPackage type="dropdown dropdown-search-input" />;
};

const SearchInputPackage = ({ type }) => (
  <div className={type} tabIndex="-1">
    <SearchInputWrapper>
      <SearchInput placeholder="검색" />
    </SearchInputWrapper>
    <SearchBtn to="#">
      <FontAwesomeIcon icon="search" />
    </SearchBtn>
  </div>
);

const Spacer = styled.div`
  height: 3rem;
`;

library.add([faSearch, faEllipsisH]);

const Header = () => {
  const [etc, setEtc] = useState(false);
  const [search, setSearch] = useState(false);

  const handleEtcToggle = () => {
    setEtc(prevOpen => !prevOpen);
  };

  const handleEtcClose = () => {
    setEtc(false);
  };

  const handleSearchToggle = () => {
    setSearch(prevOpen => !prevOpen);
  };

  const handleSearchClose = () => {
    setSearch(false);
  };

  return (
    <>
      <HeaderBlock>
        <div className="header-left">
          <Link to="/" className="logo">
            MAKE UP HARA
          </Link>
          <div className="menu">
            <Menu className="main-menu">
              <Link to="/search">Search</Link>
            </Menu>
            <Menu className="main-menu">
              <Link to="/">Blog</Link>
            </Menu>
            <ClickAwayListener onClickAway={handleEtcClose}>
              <Menu>
                <Link to="#" onClick={handleEtcToggle} aria-haspopup="true">
                  <FontAwesomeIcon icon="ellipsis-h" />
                </Link>
                <EtcDropDown state={etc} />
              </Menu>
            </ClickAwayListener>
          </div>
        </div>
        <div className="header-mid">
          <SearchResponsive>
            <SearchInputPackage type="search-input" />
          </SearchResponsive>
        </div>
        <div className="header-rigit">
          <SearchResponsive
            style={{
              display: 'inherit',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <ClickAwayListener onClickAway={handleSearchClose}>
              <div className="search-btn">
                <Link to="#" onClick={handleSearchToggle}>
                  <FontAwesomeIcon icon="search" />
                </Link>
                <SearchDropDown state={search} />
              </div>
            </ClickAwayListener>
          </SearchResponsive>
          <Button
            className="btn-sign-in"
            transparent="true"
            indigo="true"
            to="/login"
          >
            로그인
          </Button>
        </div>
      </HeaderBlock>
      <Spacer />
    </>
  );
};

export default Header;
