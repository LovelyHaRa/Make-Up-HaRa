import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/open-color';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faSearch,
  faEllipsisH,
  faEllipsisV,
  faUserCircle,
} from '@fortawesome/free-solid-svg-icons';
import Button from './Button';
import { makeStyles } from '@material-ui/core/styles';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { DarkThemeSwitch } from './CustomSwitch';

// Header 컴포넌트의 css 정의
const HeaderBlock = styled.nav`
  position: fixed;
  width: 100%;
  background: ${({ theme }) => theme.body};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 10;
  li {
    list-style-type: none !important;
  }
  & > div {
    display: flex;
  }
  .header-left {
    align-items: center;
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
    font-family: 'Raleway';
    font-weight: 400;
    color: ${({ theme }) => theme.text};
  }
  .menu {
    color: ${({ theme }) => theme.text};
    display: flex;
    align-items: center;
  }
  .main-menu {
    font-family: 'Raleway';
    font-weight: 400;
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
      color: ${({ theme }) => theme.hoverText};
      font-family: 'Raleway';
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
    z-index: 2000;
  }
  .dropdown.dropdown-menu {
    width: 14rem;
    top: 2.5rem;
    background: ${({ theme }) => theme.dropdownBody};
    color: ${({ theme }) => theme.text};
    border: none;
    border-radius: 3px;
    box-shadow: ${({ theme }) =>
      theme.body === '#fff'
        ? '0 0 5px 2px rgba(0, 0, 0, 0.15)'
        : '0 0 5px 2px rgba(0, 0, 0, 0.35)'};
    font-size: 0.8rem;
  }
  .dropdown.dropdown-menu hr {
    margin: 0 0.25rem;
    border: 0;
    height: 1px;
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
    width: 16rem;
    right: 0.5rem;
  }
  .etc-menu,
  .logout-menu {
    font-family: 'NanumBarunGothic';
  }
  .profile-menu p {
    margin: 0.5rem 0.5rem 0;
    color: ${({ theme }) => theme.text};
    font-family: 'Raleway';
    font-weight: 600;
  }
  .profile-menu li {
    margin: 0;
    padding: 0.25rem 0.5rem;
  }
  .profile-menu-mypage {
    font-family: 'Raleway';
    font-weight: 400;
  }
  .logout-menu {
    font-size: 0.9rem;
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
  .none-user div > a:hover {
    color: ${({ theme }) => theme.hoverText};
  }
`;

// 메뉴 영역 컴포넌트
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

// 반응형 검색 컴포넌트
const SearchResponsive = styled.div`
  .search-input.focus {
    border: 2px solid ${({ theme }) => theme.themeColorBody};
    border-radius: 3px;
  }
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

// 검색 컴포넌트 Wrapper
const SearchInputWrapper = styled.div`
  height: 2rem;
  box-sizing: border-box;
  display: flex;
  align-items: center;
`;

// 검색 컴포넌트의 input style 정의
const SearchInput = styled.input`
  appearance: none;
  -webkit-appearance: none;
  -webkit-border-radius: 0;
  padding: 0.55rem;
  border: none;
  border-top-left-radius: 3px;
  border-bottom-left-radius: 3px;
  background: ${({ theme }) => theme.inputBody};
  color: ${({ theme }) => theme.text};
  &::placeholder {
    font-family: 'NanumBarunGothic';
    color: ${({ theme }) => theme.placeholder};
  }
  &:focus {
    outline: none;
  }
`;

// 검색 컴포넌트 드롭다운 버튼
const SearchBtn = styled(Link)`
  width: 2rem;
  height: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme.btnSearchBody};
  color: ${({ theme }) => theme.text};
  border-top-right-radius: 3px;
  border-bottom-right-radius: 3px;
  &:hover {
    background: ${palette.gray[6]};
  }
`;

// 검색 input과 액션 버튼을 패키징
const SearchInputPackage = ({
  type,
  searchQuery,
  handleSearchInput,
  handleSearchKeyUp,
}) => {
  const [focus, setFocus] = useState(false);
  return (
    <div className={`${type}${focus ? ' focus' : ''}`} tabIndex="-1">
      <SearchInputWrapper>
        <SearchInput
          placeholder="검색"
          value={searchQuery}
          onChange={handleSearchInput}
          onKeyUp={(event) => {
            if (event.key === 'Enter') {
              handleSearchKeyUp(searchQuery);
            }
          }}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
        />
      </SearchInputWrapper>
      <SearchBtn to={`/search?query=${searchQuery}`}>
        <FontAwesomeIcon icon="search" />
      </SearchBtn>
    </div>
  );
};

// 기타메뉴 드롭다운 컴포넌트
const EtcDropDown = ({ state }) => {
  return (
    state && (
      <div className="dropdown dropdown-menu">
        <div className="all-menu">
          <p>MAIN MENU</p>
          <ul>
            <Link to="/w">
              <li>WIKI</li>
            </Link>
            <Link to="/blog">
              <li>blog</li>
            </Link>
          </ul>
          <hr />
        </div>
        <ul className="etc-menu">
          <Link to="/wiki/request">
            <li>작성이 필요한 문서[WIKI]</li>
          </Link>
          {/* <li>외부사이트 검색(구현 중...)</li>
          <li>바코드 / QR코드 만들기(구현 중...)</li>
          <li>실시간 검색어 순위(구현 중...)</li>
          <li>TODO(구현 중...)</li> */}
        </ul>
      </div>
    )
  );
};
const MemoizedEtcDropDown = React.memo(EtcDropDown);

// 검색 컴포넌트 드롭다운 처리
const SearchDropDown = ({ state, currentPath }) => {
  return (
    state && (
      <SearchInputPackage
        type="dropdown dropdown-search-input"
        currentPath={currentPath}
      />
    )
  );
};

// 유저 정보 드롭다운
const ProfileInfo = ({ user }) => {
  return (
    <div className="profile-menu">
      <p>{user.name}</p>
      <ul>
        <Link to={'/mypage'}>
          <li className="profile-menu-mypage">My Page</li>
        </Link>
      </ul>
    </div>
  );
};

// 옵션 메뉴 드롭다운
const OptionMenu = ({ isDarkTheme, handleDarkThemeToggle }) => {
  const useStyles = makeStyles(() => ({
    darkTheme: { fontFamily: 'Raleway' },
  }));
  const classes = useStyles();
  // 다크 모드 상태 저장
  const [darkTheme, setDarkTheme] = useState(false);

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
            <Grid className={classes.darkTheme} item>
              DARK THEME
            </Grid>
            <Grid item>
              <DarkThemeSwitch
                checked={darkTheme}
                onChange={() => {
                  handleDarkThemeToggle(darkTheme);
                  setDarkTheme(!darkTheme);
                }}
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

// 로그아웃 메뉴
const LogoutMenu = ({ onLogout, currentPath }) => (
  <ul className="logout-menu">
    <Link to={currentPath} onClick={onLogout}>
      <li>로그아웃</li>
    </Link>
  </ul>
);

// 로그인 상태일 때 옵션 메뉴
const UserDropDown = ({
  state,
  user,
  onLogout,
  isDarkTheme,
  handleDarkThemeToggle,
  currentPath,
}) => {
  return (
    state && (
      <div className="dropdown dropdown-menu dropdown-user-info">
        <ProfileInfo user={user} />
        <hr />
        <OptionMenu
          isDarkTheme={isDarkTheme}
          handleDarkThemeToggle={handleDarkThemeToggle}
        />
        <hr />
        <LogoutMenu onLogout={onLogout} currentPath={currentPath} />
      </div>
    )
  );
};

// 비로그인 상태일 때 옵션 메뉴
const NoneUserDropDown = ({ state, isDarkTheme, handleDarkThemeToggle }) => {
  return (
    state && (
      <div className="dropdown dropdown-menu dropdown-user-info">
        <OptionMenu
          isDarkTheme={isDarkTheme}
          handleDarkThemeToggle={handleDarkThemeToggle}
        />
      </div>
    )
  );
};

// Header는 position 처리했으므로 공간을 띄워준다
const Spacer = styled.div`
  height: 3rem;
`;

const Header = ({
  user,
  onLogout,
  isDarkTheme,
  currentPath,
  searchQuery,
  handleSearchInput,
  handleSearchKeyUp,
  handleDarkThemeToggle,
}) => {
  library.add([faSearch, faEllipsisH, faEllipsisV, faUserCircle]);
  // 드롭다운 관련 핸들러
  const [etc, setEtc] = useState(false);
  const [search, setSearch] = useState(false);
  const [userinfo, setUserinfo] = useState(false);
  const [noneuser, setNoneUser] = useState(false);

  const handleEtcToggle = useCallback(() => {
    setEtc((prevOpen) => !prevOpen);
  }, []);
  const handleEtcClose = useCallback(() => {
    setEtc(false);
  }, []);
  const handleSearchToggle = useCallback(() => {
    setSearch((prevOpen) => !prevOpen);
  }, []);
  const handleSearchClose = useCallback(() => {
    setSearch(false);
  }, []);
  const handleUserInfoToggle = useCallback(() => {
    setUserinfo((prevOpen) => !prevOpen);
  }, []);
  const handleUserInfoClose = useCallback(() => {
    setUserinfo(false);
  }, []);
  const handleNoneUserToggle = useCallback(() => {
    setNoneUser((prevOpen) => !prevOpen);
  }, []);
  const handleNoneUserClose = useCallback(() => {
    setNoneUser(false);
  }, []);

  return (
    <>
      <HeaderBlock>
        <div className="header-left">
          <Link to="/" className="logo">
            MAKE UP HARA
          </Link>
          <div className="menu">
            <Menu className="main-menu">
              <Link to="/w">WIKI</Link>
            </Menu>
            <Menu className="main-menu">
              <Link to="/blog">Blog</Link>
            </Menu>
            <ClickAwayListener onClickAway={handleEtcClose}>
              <Menu>
                <Link
                  to={currentPath}
                  onClick={handleEtcToggle}
                  aria-haspopup="true"
                >
                  <FontAwesomeIcon icon="ellipsis-h" />
                </Link>
                <MemoizedEtcDropDown state={etc} />
              </Menu>
            </ClickAwayListener>
          </div>
        </div>
        <div className="header-mid">
          <SearchResponsive>
            <SearchInputPackage
              type="search-input"
              searchQuery={searchQuery}
              handleSearchInput={handleSearchInput}
              handleSearchKeyUp={handleSearchKeyUp}
            />
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
                <Link
                  to={currentPath}
                  aria-haspopup="true"
                  onClick={handleSearchToggle}
                >
                  <FontAwesomeIcon icon="search" />
                </Link>
                <SearchDropDown state={search} currentPath={currentPath} />
              </div>
            </ClickAwayListener>
          </SearchResponsive>
          {user ? (
            <ClickAwayListener onClickAway={handleUserInfoClose}>
              <div className="user-info">
                <Link
                  to={currentPath}
                  aria-haspopup="true"
                  onClick={handleUserInfoToggle}
                >
                  <FontAwesomeIcon icon="user-circle" size="lg" />
                </Link>
                <UserDropDown
                  state={userinfo}
                  user={user}
                  onLogout={onLogout}
                  isDarkTheme={isDarkTheme}
                  handleDarkThemeToggle={handleDarkThemeToggle}
                  currentPath={currentPath}
                />
              </div>
            </ClickAwayListener>
          ) : (
            <div className="none-user">
              <ClickAwayListener onClickAway={handleNoneUserClose}>
                <div className="none-user-menu">
                  <Link to={currentPath} onClick={handleNoneUserToggle}>
                    <FontAwesomeIcon icon="ellipsis-v" />
                  </Link>
                  <NoneUserDropDown
                    state={noneuser}
                    isDarkTheme={isDarkTheme}
                    handleDarkThemeToggle={handleDarkThemeToggle}
                  />
                </div>
              </ClickAwayListener>
              <Button className="btn-sign-in" transparent="true" to="/login">
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
