import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { lightTheme, darkTheme } from './lib/styles/theme';

import { setTheme } from './module/redux/theme';
import MainPage from './pages/main/MainPage';
import PostWritePage from './pages/post/PostWritePage';
import PostPage from './pages/post/PostPage';
import PostListPage from './pages/post/PostListPage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import LoginWithNaverPage from './pages/auth/callback/LoginWithNaverPage';
import LoginWithKakaoPage from './pages/auth/callback/LoginWithKakaoPage';
import WikiPage from './pages/wiki/WikiPage';
import WikiEditPage from './pages/wiki/WikiEditPage';
import WikiRequestPage from './pages/wiki/WikiRequestPage';
import WikiHistoryPage from './pages/wiki/WikiHistoryPage';
import WikiListPage from './pages/wiki/WikiListPage';
import MyPage from './pages/profile/MyPage';
import SecurityPage from './pages/profile/SecurityPage';
import ActivityPage from './pages/profile/ActivityPage';
import LocalSearchPage from './pages/search/LocalSearchPage';

const App = () => {
  const { isDarkTheme } = useSelector(({ theme }) => ({
    isDarkTheme: theme.isDarkTheme,
  }));
  const dispatch = useDispatch();

  useEffect(() => {
    try {
      const storageTheme = localStorage.getItem('darkTheme');
      if (storageTheme === 'true') {
        dispatch(setTheme(true));
      }
    } catch (error) {
      throw new Error('cannot access localStorage');
    }
  }, [dispatch]);

  return (
    <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
      <>
        <Helmet>
          <title>MAKE UP HARA</title>
        </Helmet>
        <Route component={MainPage} path={['/']} exact />
        <Route component={LoginPage} path="/login" exact />
        <Route component={LoginWithNaverPage} path="/login/naver" />
        <Route component={LoginWithKakaoPage} path="/login/kakao" />
        <Route component={RegisterPage} path="/register" />
        <Route
          component={PostListPage}
          path={['/blog', '/blog/@:username']}
          exact
        />
        <Route component={PostWritePage} path="/blog/write" />
        <Route component={PostPage} path="/blog/@:username/:postId" exact />
        <Route component={WikiPage} path={['/w', '/w/:docName']} exact />
        <Route component={WikiEditPage} path="/wiki/edit" exact />
        <Route component={WikiRequestPage} path="/wiki/request" exact />
        <Route
          component={WikiHistoryPage}
          path="/wiki/history/:docName"
          exact
        />
        <Route component={WikiListPage} path="/wiki/list" exact />
        <Route component={MyPage} path="/mypage" exact />
        <Route component={SecurityPage} path="/mypage/security" exact />
        <Route component={ActivityPage} path="/mypage/activity" exact />
        <Route component={LocalSearchPage} path="/search" exact />
      </>
    </ThemeProvider>
  );
};

export default App;
