import React, { useState, useEffect, useRef, useCallback } from 'react';
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
  const [valid, setValid] = useState({
    curPassword: false,
    newPassword: false,
    confirmPassword: false,
  });
  // 검증 메시지
  const [validMessage, setValidMessage] = useState({
    curPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  // 비밀번호 변경 처리결과
  const [submitPassword, setSubmitPassword] = useState({
    result: false,
    message: '',
  });
  const MIN_LENGTH = 8;

  // 폼 데이터 변경시 메시지 초기화
  const onChange = useCallback(
    (e) => {
      const { value, name } = e.target;
      if (name === 'curPassword') {
        setValidMessage({
          ...validMessage,
          curPassword: '',
        });
      }
      if (submitPassword.message && submitPassword.message !== '') {
        setSubmitPassword({
          result: false,
          message: '',
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
        curPassword: curValid,
        newPassword: newValid,
        confirmPassword: confirmValid,
      } = valid;
      const { _id } = user;
      const { curPassword, newPassword } = form;
      // 검증 통과시 액션 수행
      if (curValid && newValid && confirmValid) {
        dispatch(
          changePassword({ id: _id, password: curPassword, newPassword }),
        );
      }
    },
    [dispatch, form, user, valid],
  );

  const stateValidMessage = useRef(validMessage);

  // 비동기 검증 수행
  useEffect(() => {
    const isValidNewPassword =
      form.newPassword && form.newPassword.length >= MIN_LENGTH;
    const isValidConfirmPassword =
      form.confirmPassword === form.newPassword &&
      form.confirmPassword.length >= MIN_LENGTH;
    setValid({
      curPassword: form.curPassword !== '',
      newPassword:
        form.newPassword !== '' &&
        isValidNewPassword &&
        form.newPassword !== form.curPassword,
      confirmPassword: form.confirmPassword !== '' && isValidConfirmPassword,
    });
    // 검증 실패 시 처리
    if (!isValidNewPassword && form.newPassword !== '') {
      setValidMessage({
        ...stateValidMessage.current,
        newPassword: '비밀번호는 8자 이상 입력해야 합니다!',
      });
    } else if (!isValidConfirmPassword && form.confirmPassword !== '') {
      setValidMessage({
        ...stateValidMessage.current,
        confirmPassword: '비밀번호가 일치하지 않습니다!',
      });
    } else if (
      form.newPassword !== '' &&
      form.newPassword === form.curPassword &&
      isValidNewPassword
    ) {
      setValidMessage({
        ...stateValidMessage.current,
        newPassword: '기존 비밀번호와 일치합니다.',
      });
    } else if (form.newPassword === '' || isValidNewPassword) {
      setValidMessage({
        ...stateValidMessage.current,
        newPassword: '',
      });
    } else if (form.confirmPassword === '' || isValidConfirmPassword) {
      setValidMessage({
        ...stateValidMessage.current,
        confirmPassword: '',
      });
    }
  }, [form, stateValidMessage]);

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
          message: '',
        });
        setValidMessage({
          curPassword: '기존 비밀번호가 일치하지 않습니다',
          newPassword: '',
          confirmPassword: '',
        });
        setValid({
          curPassword: false,
          newPassword: true,
          confirmPassword: true,
        });
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
      valid={valid}
      validMessage={validMessage}
      onSubmit={onSubmit}
      submitPassword={submitPassword}
    />
  );
};

export default SecurityContainer;
