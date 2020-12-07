import React, { useState, useEffect, useCallback } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import AuthForm from '../../components/auth/AuthForm';
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

  const [isValid, setIsValid] = useState({
    username: true,
    password: true,
    passwordConfirm: true,
    name: true,
  });
  const [validMessage, setValidMessage] = useState({
    username: null,
    password: null,
    passwordConfirm: null,
    name: null,
  });
  const MIN_PASSWORD_LENGTH = 8;

  // 폼 데이터 변경 이벤트
  const onChange = useCallback(
    (e) => {
      const { value, name } = e.target;
      dispatch(changeFieid({ form: 'register', key: name, value }));
      setError(null);
      if (name === 'username') {
        setIsValid((prevState) => ({ ...prevState, username: true }));
        setValidMessage((prevState) => ({
          ...prevState,
          username: null,
        }));
      } else if (name === 'name') {
        setIsValid((prevState) => ({ ...prevState, name: true }));
        setValidMessage((prevState) => ({
          ...prevState,
          name: null,
        }));
      }
    },
    [dispatch],
  );

  // submit 이벤트
  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const { username, password, passwordConfirm, name } = form;
      // 하나라도 비어 있다면
      if ([username, password, passwordConfirm, name].includes('')) {
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
    },
    [dispatch, form],
  );

  // const isLoading = useRef(true);
  // // 컴포넌트가 처음 렌더링 될 때  form을 초기화함
  // useEffect(() => {
  //   dispatch(initializeForm('register'));
  //   isLoading.current = false;
  // }, [dispatch]);

  // 비동기 계정명 중복 체크
  useEffect(() => {
    if (form.username !== '') {
      dispatch(checkExistUsername({ username: form.username }));
    }
  }, [dispatch, form.username]);

  // 계정명 중복 체크 결과 반영
  useEffect(() => {
    if (isNotExistUsernameError) {
      setIsValid((prevState) => ({ ...prevState, username: false }));
      setValidMessage((prevState) => ({
        ...prevState,
        username: '인증 서버 연결에 실패했습니다.',
      }));
    } else if (isNotExistUsername?.result) {
      setIsValid((prevState) => ({ ...prevState, username: true }));
      setValidMessage((prevState) => ({
        ...prevState,
        username: null,
      }));
    } else {
      setIsValid((prevState) => ({ ...prevState, username: false }));
      setValidMessage((prevState) => ({
        ...prevState,
        username: isNotExistUsername ? isNotExistUsername.message : null,
      }));
    }
  }, [isNotExistUsername, isNotExistUsernameError]);

  useEffect(() => {
    const isValidPassword =
      form.password.length >= MIN_PASSWORD_LENGTH || form.password.length === 0;
    setIsValid((prevState) => ({ ...prevState, password: isValidPassword }));
    if (isValidPassword) {
      setValidMessage((prevState) => ({ ...prevState, password: null }));
    } else {
      setValidMessage((prevState) => ({
        ...prevState,
        password: '비밀번호는 8자 이상 입력해야 합니다.',
      }));
    }
  }, [form.password]);

  useEffect(() => {
    const isValidPassword =
      form.passwordConfirm === form.password ||
      form.passwordConfirm.length === 0;
    setIsValid((prevState) => ({
      ...prevState,
      passwordConfirm: isValidPassword,
    }));
    if (isValidPassword) {
      setValidMessage((prevState) => ({ ...prevState, passwordConfirm: null }));
    } else {
      setValidMessage((prevState) => ({
        ...prevState,
        passwordConfirm: '비밀번호가 일치하지 않습니다.',
      }));
    }
  }, [form.password, form.passwordConfirm]);

  // 비동기 이름 중복 체크
  useEffect(() => {
    if (form.name === '') {
      return;
    }
    if (!isNotExistUsername || !isNotExistUsername.result) {
      setIsValid((prevState) => ({ ...prevState, name: false }));
      setValidMessage((prevState) => ({
        ...prevState,
        name: '계정 이름이 유효하지 않습니다.',
      }));
      return;
    }
    dispatch(checkExistName({ username: form.username, name: form.name }));
  }, [form.username, form.name, isNotExistUsername, dispatch]);

  // 이름 중복 체크 결과 반영
  useEffect(() => {
    if (isNotExistNameError) {
      setIsValid((prevState) => ({ ...prevState, name: false }));
      setValidMessage((prevState) => ({
        ...prevState,
        name: '인증 서버 연결에 실패했습니다.',
      }));
    } else if (isNotExistName?.result) {
      setIsValid((prevState) => ({ ...prevState, name: true }));
      setValidMessage((prevState) => ({
        ...prevState,
        name: null,
      }));
    } else if (!isNotExistName?.result) {
      setIsValid((prevState) => ({ ...prevState, name: false }));
      setValidMessage((prevState) => ({
        ...prevState,
        name: isNotExistName ? isNotExistName.message : null,
      }));
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
  }, [registerResult, registerResultError, history]);

  useEffect(
    () => () => {
      dispatch(initializeForm('register'));
    },
    [dispatch],
  );

  return (
    <AuthForm
      type="register"
      form={form}
      isValid={isValid}
      validMessage={validMessage}
      onChange={onChange}
      onSubmit={onSubmit}
      error={error}
    />
  );
};

export default withRouter(RegisterForm);
