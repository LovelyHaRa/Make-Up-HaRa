import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/open-color';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faSearch,
  faEllipsisH,
  faEllipsisV,
} from '@fortawesome/free-solid-svg-icons';
import Button from './Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { DarkThemeSwitch } from './CustomSwitch';
import { useDispatch } from 'react-redux';
import { setTheme } from '../../module/redux/theme';

const HeaderBlock = styled.nav`
  position: fixed;
  width: 100%;
  background: ${({ theme }) => theme.body};
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
    color: ${({ theme }) => theme.text};
  }
  .menu {
    color: ${({ theme }) => theme.text};
    display: flex;
    align-items: center;
  }
  .menu div > a:hover {
    color: ${({ theme }) => theme.hoverText};
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
  .user-info {
    margin-right: 0.5rem;
    color: ${({ theme }) => theme.text};
  }
  .dropdown {
    position: fixed;
    z-index: 100;
  }
  .dropdown.dropdown-menu {
    width: 12rem;
    top: 2.5rem;
    background: ${({ theme }) => theme.dropdownBody};
    color: ${({ theme }) => theme.text};
    border: none;
    border-radius: 3px;
    box-shadow: ${({ theme }) =>
      theme.body === '#fff'
        ? '0 0 5px 2px rgba(0, 0, 0, 0.15)'
        : '0 0 5px 2px rgba(0, 0, 0, 0.35)'};
    font-size: 0.9rem;
  }
  .dropdown.dropdown-menu hr {
    margin: 0 0.25rem;
    border: 0;
    height: 0.5px;
    background: ${palette.gray[5]};
  }
  .dropdown.dropdown-menu ul {
    padding: 0.5rem 0.25rem;
    margin: 0;
  }
  .dropdown.dropdown-menu > ul li:first-of-type {
    margin-top: 0;
  }
  .dropdown.dropdown-menu > ul li {
    margin-top: 0.25rem;
    padding: 0.5rem;
  }
  .dropdown.dropdown-menu > ul li:last-of-type {
    margin-bottom: 0;
  }
  .dropdown.dropdown-menu li:hover {
    background: ${({ theme }) => theme.hoverList};
  }
  .dropdown.dropdown-menu.dropdown-user-info {
    right: 0.5rem;
  }
  .dropdown.dropdown-search-input {
    display: flex;
    top: 2.75rem;
    right: 6.625rem;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.55);
  }
  .none-user {
    color: ${({ theme }) => theme.text};
    display: flex;
    align-items: center;
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
      color: ${({ theme }) => theme.text};
      margin: 0 1rem;
    }
    .search-btn > a:hover {
      color: ${({ theme }) => theme.hoverText};
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
  background: ${({ theme }) => theme.inputBody};
  color: ${({ theme }) => theme.text};
  &::placeholder {
    color: ${({ theme }) => theme.placeholder};
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
  background: ${({ theme }) => theme.btnSearchBody};
  border-top-right-radius: 3px;
  border-bottom-right-radius: 3px;
  &:hover {
    background: ${palette.gray[6]};
  }
`;

const EtcDropDown = ({ state }) => {
  return (
    state && (
      <div className="dropdown dropdown-menu">
        <div className="all-menu">
          <p>MAIN MENU</p>
          <ul>
            <Link to="/wiki">
              <li>WIKI</li>
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

const OptionMenu = ({ isDarkTheme }) => {
  const [darkTheme, setDarkTheme] = useState(false);
  const dispatch = useDispatch();
  const handleDarkThemeToggle = () => {
    dispatch(setTheme(!darkTheme));
    try {
      localStorage.setItem('darkTheme', !darkTheme + '');
    } catch (error) {
      throw error;
    }
    setDarkTheme(!darkTheme);
  };
  useEffect(() => {
    if (isDarkTheme) {
      setDarkTheme(true);
    }
  }, [isDarkTheme]);

  return (
    <ul>
      <li>
        <Typography component="div">
          <Grid
            component="label"
            container
            display="flex"
            alignItems="center"
            justify="space-between"
            style={{
              fontSize: '0.9rem',
              fontFamily: 'sans-serif',
              letterSpacing: '0',
            }}
          >
            <Grid item>Dark Theme</Grid>
            <Grid item>
              <DarkThemeSwitch
                checked={darkTheme}
                onChange={handleDarkThemeToggle}
                name="darkTheme"
                size="small"
              />
            </Grid>
          </Grid>
        </Typography>
      </li>
    </ul>
  );
};

const LogoutMenu = ({ onLogout }) => (
  <ul>
    <Link to="#" onClick={onLogout}>
      <li>로그아웃</li>
    </Link>
  </ul>
);

const UserDropDown = ({ state, onLogout, isDarkTheme }) => {
  return (
    state && (
      <div className="dropdown dropdown-menu dropdown-user-info">
        <OptionMenu isDarkTheme={isDarkTheme} />
        <hr />
        <LogoutMenu onLogout={onLogout} />
      </div>
    )
  );
};

const NoneUserDropDown = ({ state, isDarkTheme }) => {
  return (
    state && (
      <div className="dropdown dropdown-menu dropdown-user-info">
        <OptionMenu isDarkTheme={isDarkTheme} />
      </div>
    )
  );
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

library.add([faSearch, faEllipsisH, faEllipsisV]);

const Header = ({ user, onLogout, isDarkTheme }) => {
  const [etc, setEtc] = useState(false);
  const [search, setSearch] = useState(false);
  const [userinfo, setUserinfo] = useState(false);
  const [noneuser, setNoneUser] = useState(false);

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

  const handleUserInfoToggle = () => {
    setUserinfo(prevOpen => !prevOpen);
  };

  const handleUserInfoClose = () => {
    setUserinfo(false);
  };

  const handleNoneUserToggle = () => {
    setNoneUser(prevOpen => !prevOpen);
  };

  const handleNoneUserClose = () => {
    setNoneUser(false);
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
              <Link to="/wiki">WIKI</Link>
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
                <Link to="#" aria-haspopup="true" onClick={handleSearchToggle}>
                  <FontAwesomeIcon icon="search" />
                </Link>
                <SearchDropDown state={search} />
              </div>
            </ClickAwayListener>
          </SearchResponsive>
          {user ? (
            <ClickAwayListener onClickAway={handleUserInfoClose}>
              <div className="user-info">
                <Link
                  to="#"
                  aria-haspopup="true"
                  onClick={handleUserInfoToggle}
                >
                  {user.username}
                </Link>
                <UserDropDown
                  state={userinfo}
                  onLogout={onLogout}
                  isDarkTheme={isDarkTheme}
                />
              </div>
            </ClickAwayListener>
          ) : (
            <div className="none-user">
              <ClickAwayListener onClickAway={handleNoneUserClose}>
                <div className="">
                  <Link to="#" onClick={handleNoneUserToggle}>
                    <FontAwesomeIcon icon="ellipsis-v" />
                  </Link>
                  <NoneUserDropDown
                    state={noneuser}
                    isDarkTheme={isDarkTheme}
                  />
                </div>
              </ClickAwayListener>
              <Button
                className="btn-sign-in"
                transparent="true"
                to="/login"
              >
                로그인
              </Button>
            </div>
          )}
        </div>
      </HeaderBlock>
      <Spacer />
    </>
  );
};

export default Header;
