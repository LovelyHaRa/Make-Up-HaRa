import React from 'react';
import { Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import { ThemeProvider } from 'styled-components';
import { lightTheme } from './lib/styles/theme';
import { darkTheme } from './lib/styles/theme';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

const App = () => {
  return (
    <ThemeProvider theme={lightTheme}>
      <>
        <Route component={MainPage} path={['/']} exact />
        <Route component={LoginPage} path={'/login'} />
        <Route component={RegisterPage} path={'/register'} />
      </>
    </ThemeProvider>
  );
};

export default App;
