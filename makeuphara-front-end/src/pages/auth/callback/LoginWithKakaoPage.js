import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import qs from 'qs';
import { useDispatch, useSelector } from 'react-redux';
import { loginWithKakao } from '../../../module/redux/auth';
import { check } from '../../../module/redux/user';

const LoginWithKakaoPage = ({ location, history }) => {
  const dispatch = useDispatch();
  const { auth, authError, user } = useSelector(({ auth, user }) => ({
    auth: auth.auth,
    authError: auth.authError,
    user: user.user,
  }));
  const { code, error } = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });
  if (error) {
    history.replace('/login');
  }
  const client_id = process.env.REACT_APP_KAKAO_CLIENT_ID;
  const client_secret = process.env.REACT_APP_KAKAO_CLIENT_SECRET;
  const redirect_uri = process.env.REACT_APP_KAKAO_LOGIN_REDIRECT_URI;

  useEffect(() => {
    dispatch(loginWithKakao({ client_id, client_secret, redirect_uri, code }));
  }, [dispatch, client_id, client_secret, code, redirect_uri]);

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

export default withRouter(LoginWithKakaoPage);
