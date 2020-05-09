import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import qs from 'qs';
import { useDispatch, useSelector } from 'react-redux';
import { loginWithKakao } from '../module/redux/auth';
import { check } from '../module/redux/user';
import axios from 'axios';

const LoginWithKakaoCallbackPage = ({ location, history }) => {
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
  const requestUrl = 'https://kauth.kakao.com/oauth/token';
  useEffect(() => {
    axios
      .post(requestUrl, null, {
        headers: {
          'Content-type': 'application/x-www-form-urlencoded',
        },
        params: {
          grant_type: 'authorization_code',
          client_id,
          client_secret,
          code,
          redirect_uri,
        },
      })
      .then((response) => {
        const data = response.status === 200 && response.data;
        console.dir(data);
        console.dir(data.access_token);
        dispatch(loginWithKakao({ data }));
      })
      .catch((error) => {
        // ctx.throw(error.response.status || 500, error);
        console.dir(error);
      });
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

export default withRouter(LoginWithKakaoCallbackPage);
