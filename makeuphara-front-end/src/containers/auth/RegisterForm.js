import React, { useState, useEffect, useRef } from 'react';
import { withRouter } from 'react-router-dom';
import AuthForm from '../../components/auth/AuthForm';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeFieid,
  register,
  initializeForm,
  checkExistUsername,
  checkExistName,
} from '../../module/redux/auth';

const RegisterForm = ({ history }) => {
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const {
    form,
    isNotExistUsername,
    isNotExistUsernameError,
    isNotExistName,
    isNotExistNameError,
    registerResult,
    registerResultError,
  } = useSelector(({ auth }) => ({
    form: auth.register,
    isNotExistUsername: auth.checkExistUsernameResult,
    isNotExistUsernameError: auth.checkExistUsernameResultError,
    isNotExistName: auth.checkExistNameResult,
    isNotExistNameError: auth.checkExistNameResultError,
    registerResult: auth.registerResult,
    registerResultError: auth.registerResultError,
  }));

  const [validUsername, setValidUsername] = useState({
    result: false,
    message: '',
  });
  const [validName, setValidName] = useState({
    result: false,
    message: '',
  });

  // 폼 데이터 변경 이벤트
  const onChange = (e) => {
    const { value, name } = e.target;
    dispatch(changeFieid({ form: 'register', key: name, value }));
    setError(null);
    if (name === 'username') {
      setValidUsername({
        result: false,
        message: '',
      });
    } else if (name === 'name') {
      setValidName({
        result: false,
        message: '',
      });
    }
  };

  // submit 이벤트
  const onSubmit = (e) => {
    e.preventDefault();
    const { username, password, passwordConfirm, name } = form;
    // 하나라도 비어 있다면
    if ([username, password, passwordConfirm].includes('')) {
      setError('빈 칸을 모두 입력하세요.');
      return;
    }
    // 비밀번호가 일치하지 않는다면
    if (password !== passwordConfirm) {
      setError('비밀번호가 일치하지 않습니다.');
      dispatch(changeFieid({ form: 'register', key: 'password', value: '' }));
      dispatch(
        changeFieid({ form: 'register', key: 'passwordConfirm', value: '' }),
      );
      return;
    }
    dispatch(register({ username, password, name }));
  };

  const isLoading = useRef(true);
  // 컴포넌트가 처음 렌더링 될 때  form을 초기화함
  useEffect(() => {
    dispatch(initializeForm('register'));
    isLoading.current = false;
  }, [dispatch]);

  // 비동기 계정명 중복 체크
  useEffect(() => {
    if (isLoading.current) return;
    if (form.username !== '') {
      dispatch(checkExistUsername({ username: form.username }));
    }
  }, [isLoading, dispatch, form.username]);

  // 비동기 이름 중복 체크
  useEffect(() => {
    if (isLoading.current) return;
    const { username, name } = form;
    if (name === '') return;
    if (
      !isNotExistUsername ||
      (isNotExistUsername && !isNotExistUsername.result)
    ) {
      setValidName({
        result: false,
        message: '계정 이름이 유효하지 않습니다.',
      });
      return;
    } else {
      dispatch(checkExistName({ username, name }));
    }
  }, [isLoading, dispatch, form, isNotExistUsername]);

  // 계정명 중복 체크 결과 반영
  useEffect(() => {
    if (isNotExistUsernameError) {
      setValidUsername({
        result: false,
        message: '인증 서버 연결에 실패했습니다.',
      });
    } else if (!isNotExistUsername) return;
    else if (isNotExistUsername.result) {
      setValidUsername({ result: true, message: '' });
    } else {
      setValidUsername({
        result: false,
        message: isNotExistUsername ? isNotExistUsername.message : '',
      });
    }
  }, [isNotExistUsername, isNotExistUsernameError]);

  // 이름 중복 체크 결과 반영
  useEffect(() => {
    if (isNotExistNameError) {
      setValidName({
        result: false,
        message: '인증 서버 연결에 실패했습니다.',
      });
    } else if (!isNotExistName) return;
    else if (isNotExistName.result) {
      setValidName({ result: true, message: '' });
    } else {
      setValidName({
        result: false,
        message: isNotExistName ? isNotExistName.message : '',
      });
    }
  }, [isNotExistName, isNotExistNameError]);
  // 회원가입 성공/실패 처리
  useEffect(() => {
    if (registerResultError) {
      // 계정명이 이미 존재할 때
      if (registerResultError.response.status === 409) {
        setError('이미 존재하는 계정입니다.');
        return;
      }
      // 기타 이유
      setError('회원가입 실패');
      return;
    }
    if (registerResult) {
      history.replace('/login');
    }
  }, [registerResult, registerResultError, dispatch, history]);

  return (
    <AuthForm
      type="register"
      form={form}
      validUsername={validUsername}
      validName={validName}
      onChange={onChange}
      onSubmit={onSubmit}
      error={error}
    />
  );
};

export default withRouter(RegisterForm);
