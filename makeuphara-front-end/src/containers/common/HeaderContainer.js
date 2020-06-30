import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../module/redux/user';
import Header from '../../components/common/Header';
import { withRouter } from 'react-router-dom';
import { changeInput } from '../../module/redux/search';
import loadable from '@loadable/component';

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
  const onLogout = () => {
    dispatch(logout());
  };

  const handleSearchKeyUp = (searchQuery) => {
    history.push(`/search?query=${searchQuery}`);
  };

  const handleSearchInput = (event) => {
    dispatch(changeInput(event.target.value));
  };

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
    />
  );
};

export default withRouter(HeaderContainer);
