import React, { useState, useEffect, useCallback } from 'react';
import Security from '../../components/profile/Security';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeField,
  changePassword,
  initializeChangePassword,
} from '../../module/redux/user';

const SecurityContainer = () => {
  // 액션 상태 불러오기
  const dispatch = useDispatch();
  // 전역 상태 불러오기
  const { user, form, changePasswordResult, changePasswordError } = useSelector(
    ({ user }) => ({
      user: user.user,
      form: user.password,
      changePasswordResult: user.changePasswordResult,
      changePasswordError: user.changePasswordError,
    }),
  );

  // 검증 정보
  const [isValid, setIsValid] = useState({
    curPassword: false,
    newPassword: false,
    confirmPassword: false,
  });
  // 검증 메시지
  const [validMessage, setValidMessage] = useState({
    curPassword: null,
    newPassword: null,
    confirmPassword: null,
  });
  // 비밀번호 변경 처리결과
  const [submitPassword, setSubmitPassword] = useState({
    result: false,
    message: null,
  });
  const MIN_LENGTH = 8;

  // 폼 데이터 변경시 메시지 초기화
  const onChange = useCallback(
    (e) => {
      const { value, name } = e.target;
      if (name === 'curPassword') {
        setValidMessage({
          ...validMessage,
          curPassword: null,
        });
      }
      if (submitPassword.message) {
        setSubmitPassword({
          result: false,
          message: null,
        });
      }
      dispatch(changeField({ form: 'password', key: name, value }));
    },
    [dispatch, submitPassword, validMessage],
  );

  // submit 이벤트
  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const {
        curPassword: isCurValid,
        newPassword: isNewValid,
        confirmPassword: isConfirmValid,
      } = isValid;
      const { _id } = user;
      const { curPassword, newPassword } = form;
      // 검증 통과시 액션 수행
      if (isCurValid && isNewValid && isConfirmValid) {
        dispatch(
          changePassword({ id: _id, password: curPassword, newPassword }),
        );
      }
    },
    [dispatch, form, user, isValid],
  );

  // 비동기 검증 수행
  useEffect(() => {
    const isValidNewPassword =
      form.newPassword && form.newPassword.length >= MIN_LENGTH;
    const isValidConfirmPassword =
      form.confirmPassword === form.newPassword &&
      form.confirmPassword.length >= MIN_LENGTH;
    setIsValid({
      curPassword: form.curPassword !== '',
      newPassword:
        form.newPassword !== '' &&
        isValidNewPassword &&
        form.newPassword !== form.curPassword,
      confirmPassword: form.confirmPassword !== '' && isValidConfirmPassword,
    });
    // 검증 실패 시 처리
    if (!isValidNewPassword && form.newPassword !== '') {
      setValidMessage((prevState) => ({
        ...prevState,
        newPassword: '비밀번호는 8자 이상 입력해야 합니다!',
      }));
    } else if (
      form.newPassword !== '' &&
      form.newPassword === form.curPassword &&
      isValidNewPassword
    ) {
      setValidMessage((prevState) => ({
        ...prevState,
        newPassword: '기존 비밀번호와 일치합니다.',
      }));
    } else if (form.newPassword === '' || isValidNewPassword) {
      setValidMessage((prevState) => ({
        ...prevState,
        newPassword: '',
      }));
    }
    if (!isValidConfirmPassword && form.confirmPassword !== '') {
      setValidMessage((prevState) => ({
        ...prevState,
        confirmPassword: '비밀번호가 일치하지 않습니다!',
      }));
    } else if (form.confirmPassword === '' || isValidConfirmPassword) {
      setValidMessage((prevState) => ({
        ...prevState,
        confirmPassword: '',
      }));
    }
  }, [form]);

  // 비밀번호 변경 처리 결과에 따른 메시지 저장
  useEffect(() => {
    if (changePasswordResult) {
      setSubmitPassword({
        result: true,
        message: '비밀번호가 성공적으로 변경되었습니다.',
      });
      dispatch(initializeChangePassword());
    } else if (changePasswordError) {
      if (
        changePasswordError.response &&
        changePasswordError.response.status === 412
      ) {
        setSubmitPassword({
          result: false,
          message: null,
        });
        setValidMessage((prevState) => ({
          ...prevState,
          curPassword: '기존 비밀번호가 일치하지 않습니다',
        }));
        setIsValid((prevState) => ({
          ...prevState,
          curPassword: false,
        }));
      } else {
        setSubmitPassword({
          result: false,
          message: '비밀번호 변경에 실패했습니다.',
        });
      }
    }
  }, [dispatch, changePasswordResult, changePasswordError]);

  // 언마운트시 작업
  useEffect(() => {
    return () => {
      dispatch(initializeChangePassword());
    };
  }, [dispatch]);

  return (
    <Security
      user={user}
      form={form}
      onChange={onChange}
      isValid={isValid}
      validMessage={validMessage}
      onSubmit={onSubmit}
      submitPassword={submitPassword}
    />
  );
};

export default SecurityContainer;
