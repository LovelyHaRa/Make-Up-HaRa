import React, { useState, useEffect, useCallback } from 'react';
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
      onSocialLogin={onSocialLogin}
    />
  );
};

export default withRouter(LoginForm);
