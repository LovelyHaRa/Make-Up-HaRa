import React, { useState, useEffect, useCallback, useRef } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import AuthForm from '../../components/auth/AuthForm';
import {
  changeFieid,
  login,
  loginWithGoogle,
  initializeForm,
} from '../../module/redux/auth';
import { check } from '../../module/redux/user';

const LoginForm = ({ history }) => {
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const { form, auth, authError, user } = useSelector(({ auth, user }) => ({
    form: auth.login,
    auth: auth.auth,
    authError: auth.authError,
    user: user.user,
  }));

  // 폼 데이터 변경 이벤트
  const onChange = useCallback(
    (e) => {
      const { value, name } = e.target;
      dispatch(changeFieid({ form: 'login', key: name, value }));
      setError(null);
    },
    [dispatch],
  );

  // submit 이벤트
  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const { username, password } = form;
      if ([username, password].includes('')) {
        setError('빈 칸을 모두 입력하세요.');
        return;
      }
      dispatch(login({ username, password }));
    },
    [dispatch, form],
  );

  // 구글 로그인 이벤트
  const onSocialLogin = useCallback(
    ({ id_token }) => {
      dispatch(loginWithGoogle({ id_token }));
    },
    [dispatch],
  );

  // Login with Google
  const googleLoginBtn = useRef(null);
  const auth2 = useRef(null);

  // Config Google Login API
  const loadGoogleLoginApi = useCallback(() => {
    // 로그인 버튼 이벤트 주입
    const prepareLoginButton = () => {
      auth2.current.attachClickHandler(
        googleLoginBtn.current,
        {},
        (googleUser) => {
          // const profile = googleUser.getBasicProfile();
          // console.log('Token || ' + googleUser.getAuthResponse().id_token);
          // console.log('ID: ' + profile.getId());
          // console.log('Name: ' + profile.getName());
          // console.log('Image URL: ' + profile.getImageUrl());
          // console.log('Email: ' + profile.getEmail());

          const { id_token } = googleUser.getAuthResponse();
          onSocialLogin({ id_token });
        },
        (error) => {
          // console.log(JSON.stringify(error, undefined, 2));
          Error(error);
        },
      );
    };

    window.googleSDKLoaded = () => {
      window.gapi.load('auth2', () => {
        auth2.current = window.gapi.auth2.init({
          client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
          cookiepolicy: 'single_host_origin',
          scope: 'profile email',
        });
        prepareLoginButton();
      });
    };
  }, [onSocialLogin]);

  // 네이버 로그인 클릭 이벤트
  const onNaverLoginClick = useCallback(() => {
    const client_id = process.env.REACT_APP_NAVER_CLIENT_ID;
    const redirect_uri = process.env.REACT_APP_NAVER_LOGIN_REDIRECT_URI;
    const state = process.env.REACT_APP_NAVER_LOGIN_STATE;
    let requestUrl =
      'https://nid.naver.com/oauth2.0/authorize?response_type=code';
    requestUrl += `&client_id=${client_id}`;
    requestUrl += `&redirect_uri=${redirect_uri}`;
    requestUrl += `&state=${state}`;
    window.location = requestUrl;
  }, []);

  // 카카오 로그인 클릭 이벤트
  const onKakaoLoginClick = useCallback(() => {
    const client_id = process.env.REACT_APP_KAKAO_CLIENT_ID;
    const redirect_uri = process.env.REACT_APP_KAKAO_LOGIN_REDIRECT_URI;
    const state = process.env.REACT_APP_KAKAO_LOGIN_STATE;
    let requestUrl =
      'https://kauth.kakao.com/oauth/authorize?response_type=code';
    requestUrl += `&client_id=${client_id}`;
    requestUrl += `&redirect_uri=${redirect_uri}`;
    requestUrl += `&state=${state}`;
    window.location = requestUrl;
  }, []);

  // Load Script
  const loadScript = useCallback((document, script, id, srcValue) => {
    const referenceNode = document.getElementsByTagName(script)[0];
    if (document.getElementById(id)) {
      return;
    }
    const googlejssdkNode = document.createElement(script);
    googlejssdkNode.id = id;
    googlejssdkNode.src = srcValue;
    referenceNode.parentNode.insertBefore(googlejssdkNode, referenceNode);
  }, []);

  // 언마운트시 API 스크립트 제거
  const removeApiScript = useCallback(() => {
    const removeTag = (tagName, targetId) => {
      const targetNode = document.getElementsByTagName(tagName);
      [...targetNode].map(
        (node) =>
          node.src.indexOf(targetId) >= 0 && node.parentNode.removeChild(node),
      );
    };

    removeTag('script', 'apis.google.com');

    const removeJssdk = (id) => {
      const sdkNode = document.getElementById(id);
      if (sdkNode) {
        sdkNode.parentNode.removeChild(sdkNode);
      }
    };

    removeJssdk('google-jssdk');
  }, []);

  // 컴포넌트 업데이트시 소셜로그인 스크립트 로딩
  // 언마운트시 스크립트 제거
  useEffect(() => {
    loadScript(
      document,
      'script',
      'google-jssdk',
      'https://apis.google.com/js/platform.js?onload=googleSDKLoaded',
    );
    loadGoogleLoginApi();

    return () => {
      removeApiScript();
    };
  }, [loadScript, removeApiScript, loadGoogleLoginApi]);

  // 로그인 성공/실페에 따른 처리
  useEffect(() => {
    // 로그인 실패 시 에러 메시지 출력
    if (authError) {
      if (authError.response.status === 401) {
        setError('계정 또는 비밀번호가 일치하지 않습니다.');
        return;
      }
      setError(`로그인 실패: ${authError}`);
      return;
    }
    // 로그인 성공 시 check 액션을 통해 유저 정보를 리덕스 상태에 업데이트
    if (auth) {
      dispatch(check());
      dispatch(initializeForm()); // 폼 입력 초기화
    }
    return () => {
      dispatch(initializeForm()); // 언마운트 시 폼 입력 초기화
    };
  }, [auth, authError, dispatch]);

  // 로그인 성공시 유저 정보 세션에 저장 후 페이지 리다이렉션
  useEffect(() => {
    if (user) {
      history.replace('/');
      try {
        sessionStorage.setItem('user', JSON.stringify(user));
      } catch (error) {
        throw new Error('cannot access sessionStorage');
      }
    }
  }, [user, history]);

  return (
    <AuthForm
      type="login"
      form={form}
      onChange={onChange}
      onSubmit={onSubmit}
      error={error}
      googleLoginBtn={googleLoginBtn}
      onNaverLoginClick={onNaverLoginClick}
      onKakaoLoginClick={onKakaoLoginClick}
    />
  );
};

export default withRouter(LoginForm);
