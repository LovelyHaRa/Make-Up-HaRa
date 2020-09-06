import React, { useEffect, useState, useRef, useCallback } from 'react';
import Profile from '../../components/profile/Profile';
import { useSelector, useDispatch } from 'react-redux';
import {
  changeField,
  checkExistName,
  check,
  initializeUpdateName,
  updateName,
} from '../../module/redux/user';

const ProfileContainer = () => {
  // 액션 함수 불러오기
  const dispatch = useDispatch();
  // 전역 상태 불러오기
  const {
    user,
    form,
    isNotExistName,
    updateUser,
    updateUserError,
  } = useSelector(({ user }) => ({
    user: user.user,
    form: user.profile,
    isNotExistName: user.checkExistNameResult,
    updateUser: user.updateUser,
    updateUserError: user.updateUserError,
  }));

  // 사용 가능한 이름 여부, 기존 사용자 이름이랑 일치하는지 여부
  const [isValid, setIsValid] = useState({ existName: true, equalName: true });
  // 검증 메시지
  const [validMessage, setValidMessage] = useState({
    existName: null,
  });
  // 결과 메시지
  const [resultMessage, setResultMessage] = useState({
    submit: null,
    error: null,
  });
  // form 로딩 여부
  const loadingForm = useRef(true);

  // input 상태 반영
  const onChange = useCallback(
    (e) => {
      setValidMessage((prevState) => ({ ...prevState, existName: null }));
      setResultMessage({
        submit: null,
        error: null,
      });
      const { value, name } = e.target;
      dispatch(changeField({ form: 'profile', key: name, value }));
    },
    [dispatch],
  );

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const { isExist, isEqual } = isValid;
      if (isExist && !isEqual) {
        dispatch(updateName({ id: user._id, name: form.name }));
      }
    },
    [dispatch, form.name, user, isValid],
  );

  useEffect(() => {
    if (!user || loadingForm.current) return;
    const newName = form.name;
    const curName = user ? user.name : '';
    // 이름이 현재 사용자 이름이랑 다르면
    if (newName === '') {
      dispatch(checkExistName({ username: user.username, name: '' })); // 요청해서 공백일 떄의 결과 값을 갱신 한다
    } else if (newName.toLowerCase() !== curName.toLowerCase()) {
      // 이름이 사용 가능한지 비동기로 요청
      dispatch(checkExistName({ username: user.username, name: newName }));
      setIsValid((prevState) => ({ ...prevState, equalName: false }));
    } else {
      setIsValid((prevState) => ({ ...prevState, equalName: true }));
    }
  }, [dispatch, form.name, user]);

  useEffect(() => {
    // 중복되지 않은 이름일 때
    if (!isNotExistName || (isNotExistName && isNotExistName.result)) {
      setIsValid((prevState) => ({ ...prevState, existName: true }));
    } else {
      // 상태 업데이트
      setIsValid((prevState) => ({
        ...prevState,
        existName: false,
        equalName: false,
      }));
      // 메시지 저장
      setValidMessage((prevState) => ({
        ...prevState,
        existName: isNotExistName ? isNotExistName.message : null,
      }));
    }
  }, [isNotExistName]);

  useEffect(() => {
    const { name } = user ? user : '';
    dispatch(changeField({ form: 'profile', key: 'name', value: name }));
    loadingForm.current = false;
  }, [dispatch, user]);

  useEffect(() => {
    if (updateUser) {
      dispatch(check());
      setResultMessage({
        submit: '성공적으로 수정되었습니다.',
        error: null,
      });
      dispatch(initializeUpdateName());
    } else if (updateUserError) {
      setResultMessage({
        submit: null,
        error: '에러가 발생했습니다.',
      });
      dispatch(initializeUpdateName());
    }
  }, [dispatch, updateUser, updateUserError]);

  useEffect(() => {
    return () => {
      dispatch(initializeUpdateName());
    };
  }, [dispatch]);

  return (
    <Profile
      user={user}
      form={form}
      onChange={onChange}
      onSubmit={onSubmit}
      isValid={isValid}
      validMessage={validMessage}
      resultMessage={resultMessage}
    />
  );
};

export default ProfileContainer;
