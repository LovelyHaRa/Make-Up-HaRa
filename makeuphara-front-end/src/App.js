import React from 'react';
import { Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import { ThemeProvider } from 'styled-components';
import { lightTheme } from './lib/styles/theme';

const App = () => {
  return (
    <ThemeProvider theme={lightTheme}>
      <>
        <Route component={MainPage} path={['/']} exact />
      </>
    </ThemeProvider>
  );
};

export default App;
