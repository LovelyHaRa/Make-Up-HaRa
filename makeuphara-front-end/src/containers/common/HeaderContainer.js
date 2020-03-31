import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../module/redux/user';
import Header from '../../components/common/Header';

const HeaderContainer = () => {
  const { user, isDarkTheme } = useSelector(({ user, theme }) => ({
    user: user.user,
    isDarkTheme: theme.isDarkTheme,
  }));
  const dispatch = useDispatch();
  const onLogout = () => {
    dispatch(logout());
  };
  return <Header user={user} onLogout={onLogout} isDarkTheme={isDarkTheme} />;
};

export default HeaderContainer;
