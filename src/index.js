import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import createSagaMiddleware from 'redux-saga';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';
import rootReducer, { rootSaga } from './module/redux/index';
import { tempSetUser, check } from './module/redux/user';
import * as serviceWorker from './serviceWorker';
import App from './App';
// import { composeWithDevTools } from 'redux-devtools-extension';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  rootReducer,
  // composeWithDevTools(applyMiddleware(sagaMiddleware)), // dev
  applyMiddleware(sagaMiddleware),
);

sagaMiddleware.run(rootSaga);
const loadUser = () => {
  try {
    const user = sessionStorage.getItem('user');
    if (!user) return;
    store.dispatch(tempSetUser(user));
    store.dispatch(check());
  } catch (error) {
    throw new Error('cannot access sessionStorage');
  }
};
loadUser();

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
