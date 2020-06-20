import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../module/redux/user';
import Header from '../../components/common/Header';
import { withRouter } from 'react-router-dom';
import { changeInput } from '../../module/redux/search';

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
