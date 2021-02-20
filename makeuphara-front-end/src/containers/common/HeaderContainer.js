import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import loadable from '@loadable/component';
import { logout } from '../../module/redux/user';
import { setTheme } from '../../module/redux/theme';
import Header from '../../components/common/Header';
import { changeInput } from '../../module/redux/search';

const AuthTemplate = loadable(() =>
  import('../../components/auth/AuthTemplate'),
);
const LoginForm = loadable(() => import('../../containers/auth/LoginForm'), {});
const RegisterForm = loadable(() =>
  import('../../containers/auth/RegisterForm'),
);

const HeaderContainer = ({ location, history }) => {
  const dispatch = useDispatch();
  const { user, isDarkTheme, searchQuery } = useSelector(
    ({ user, theme, search }) => ({
      user: user.user,
      isDarkTheme: theme.isDarkTheme,
      searchQuery: search.query,
    }),
  );

  const currentPath = location.pathname + location.search;

  const onLogout = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  const handleSearchKeyUp = useCallback(
    (searchQuery) => {
      history.push(`/search?query=${searchQuery}`);
    },
    [history],
  );

  const handleSearchInput = useCallback(
    (event) => {
      dispatch(changeInput(event.target.value));
    },
    [dispatch],
  );

  const handleDarkThemeToggle = useCallback(
    (state) => {
      dispatch(setTheme(!state));
      try {
        // 로컬스토리지에 다크모드 상태값 저장
        localStorage.setItem('darkTheme', `${!state}`);
      } catch (error) {
        throw new Error('cannot access localStorage');
      }
    },
    [dispatch],
  );

  // 사용자 인증 관련 컴포넌트를 미리 로딩
  useEffect(() => {
    AuthTemplate.preload();
    LoginForm.preload();
    RegisterForm.preload();
  }, []);

  return (
    <Header
      user={user}
      onLogout={onLogout}
      isDarkTheme={isDarkTheme}
      currentPath={currentPath}
      searchQuery={searchQuery}
      handleSearchInput={handleSearchInput}
      handleSearchKeyUp={handleSearchKeyUp}
      handleDarkThemeToggle={handleDarkThemeToggle}
    />
  );
};

export default withRouter(HeaderContainer);
