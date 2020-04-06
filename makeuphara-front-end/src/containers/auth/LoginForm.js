import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import AuthForm from '../../components/auth/AuthForm';
import { useDispatch, useSelector } from 'react-redux';
import { changeFieid, login } from '../../module/redux/auth';
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

  const onChange = e => {
    const { value, name } = e.target;
    dispatch(changeFieid({ form: 'login', key: name, value }));
    setError(null);
  };

  const onSubmit = e => {
    e.preventDefault();
    const { username, password } = form;
    if ([username, password].includes('')) {
      setError('빈 칸을 모두 입력하세요.');
      return;
    }
    dispatch(login({ username, password }));
  };

  useEffect(() => {
    if (authError) {
      if (authError.response.status === 401) {
        setError('계정 또는 비밀번호가 일치하지 않습니다.');
        return;
      } else {
        setError('로그인 실패: ' + authError);
        return;
      }
    }
    if (auth) {
      dispatch(check());
    }
  }, [auth, authError, dispatch]);

  useEffect(() => {
    if (user) {
      history.push('/');
      try {
        sessionStorage.setItem('user', JSON.stringify(user));
      } catch (error) {
        throw error;
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
    />
  );
};

export default withRouter(LoginForm);
