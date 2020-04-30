import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../module/redux/user';
import Header from '../../components/common/Header';
import { withRouter } from 'react-router-dom';

const HeaderContainer = ({ location }) => {
  const { user, isDarkTheme } = useSelector(({ user, theme }) => ({
    user: user.user,
    isDarkTheme: theme.isDarkTheme,
  }));
  const dispatch = useDispatch();
  const currentPath = location.pathname + location.search;
  const onLogout = () => {
    dispatch(logout());
  };
  return (
    <Header
      user={user}
      onLogout={onLogout}
      isDarkTheme={isDarkTheme}
      currentPath={currentPath}
    />
  );
};

export default withRouter(HeaderContainer);
