import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import { ThemeProvider } from 'styled-components';
import { lightTheme } from './lib/styles/theme';
import { darkTheme } from './lib/styles/theme';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { useSelector, useDispatch } from 'react-redux';
import { setTheme } from './module/redux/theme';
import PostWritePage from './pages/PostWritePage';
import PostPage from './pages/PostPage';
import PostListPage from './pages/PostListPage';
import { Helmet } from 'react-helmet-async';
import LoginWithNaverCallbackPage from './pages/LoginWithNaverCallbackPage';
import LoginWithKakaoCallbackPage from './pages/LoginWithKakaoCallbackPage';
import WikiPage from './pages/WikiPage';
import WikiEditPage from './pages/WikiEditPage';
import WikiRequestPage from './pages/WikiRequestPage';
import WikiHistoryPage from './pages/WikiHistoryPage';

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
      throw error;
    }
  }, [dispatch]);
  return (
    <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
      <>
        <Helmet>
          <title>MAKE UP HARA</title>
        </Helmet>
        <Route component={MainPage} path={['/']} exact />
        <Route component={LoginPage} path={'/login'} exact />
        <Route component={LoginWithNaverCallbackPage} path={'/login/naver'} />
        <Route component={LoginWithKakaoCallbackPage} path={'/login/kakao'} />
        <Route component={RegisterPage} path={'/register'} />
        <Route
          component={PostListPage}
          path={['/blog', '/blog/@:username']}
          exact
        />
        <Route component={PostWritePage} path={'/blog/write'} />
        <Route component={PostPage} path={'/blog/@:username/:postId'} exact />
        <Route component={WikiPage} path={['/w', '/w/:docName']} exact />
        <Route component={WikiEditPage} path={'/wiki/edit'} exact />
        <Route component={WikiRequestPage} path={'/wiki/request'} exact />
        <Route
          component={WikiHistoryPage}
          path={'/wiki/history/:docName'}
          exact
        />
      </>
    </ThemeProvider>
  );
};

export default App;
