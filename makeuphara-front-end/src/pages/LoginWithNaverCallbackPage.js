import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import qs from 'qs';
import { useDispatch, useSelector } from 'react-redux';
import { loginWithNaver } from '../module/redux/auth';
import { check } from '../module/redux/user';

const LoginWithNaverCallbackPage = ({ location, history }) => {
  const dispatch = useDispatch();
  const { auth, authError, user } = useSelector(({ auth, user }) => ({
    auth: auth.auth,
    authError: auth.authError,
    user: user.user,
  }));
  const { code, state, error } = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });
  if (error) {
    history.replace('/login');
  }
  const client_id = process.env.REACT_APP_NAVER_CLIENT_ID;
  const client_secret = process.env.REACT_APP_NAVER_CLIENT_SECRET;

  useEffect(() => {
    dispatch(loginWithNaver({ client_id, client_secret, code, state }));
  }, [dispatch, client_id, client_secret, code, state]);

  useEffect(() => {
    if (auth) {
      dispatch(check());
    }
    if (authError) {
      history.replace('/login');
    }
  }, [dispatch, auth, authError, history]);

  useEffect(() => {
    if (user) {
      try {
        sessionStorage.setItem('user', JSON.stringify(user));
        history.replace('/');
      } catch (error) {
        throw error;
      }
    }
  }, [user, history]);
  return (
    <>
      <div />
    </>
  );
};

export default withRouter(LoginWithNaverCallbackPage);
