import React, { useEffect, useState, useRef } from 'react';
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
  const dispatch = useDispatch();
  const {
    user,
    form,
    isNotExistName,
    isNotExistNameError,
    updateUser,
    updateUserError,
  } = useSelector(({ user }) => ({
    user: user.user,
    form: user.profile,
    isNotExistName: user.checkExistNameResult,
    isNotExistNameError: user.checkExistNameResultError,
    updateUser: user.updateUser,
    updateUserError: user.updateUserError,
  }));

  const [validName, setValidName] = useState(true); // 사용 가능한 이름 여부
  const [equalName, setEqualName] = useState(true); // 기존 사용자 이름이랑 일치하는지 여부
  const [nameMessage, setNameMessage] = useState(''); // 검증 실패 메시지
  const [submitMessage, setSubmitMessage] = useState(''); // submit 결과 메시지
  const [errorMessage, setErrorMessage] = useState(''); // submit 에러 메시지
  const loadingForm = useRef(true);

  // input 상태 반영
  const onChange = (e) => {
    setNameMessage('');
    setSubmitMessage('');
    setErrorMessage('');
    const { value, name } = e.target;
    dispatch(changeField({ form: 'profile', key: name, value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { name } = form;
    const { _id } = user;
    if (validName && !equalName) {
      dispatch(updateName({ id: _id, name }));
    }
  };

  useEffect(() => {
    // 중복되지 않은 이름일 때
    if (!isNotExistName || (isNotExistName && isNotExistName.result)) {
      setValidName(true);
    } else {
      // 상태 업데이트
      setValidName(false);
      setEqualName(false);
      setNameMessage(isNotExistName ? isNotExistName.message : ''); // 메시지 저장
    }
  }, [isNotExistName]);

  useEffect(() => {
    if (!user) return;
    if (loadingForm.current) return;
    const { name } = form;
    const loginName = user ? user.name : '';
    if (name === undefined) return;
    // 이름이 현재 사용자 이름이랑 다르면
    if (name && name.toLowerCase() !== loginName.toLowerCase()) {
      // 이름이 사용 가능한지 비동기로 요청
      dispatch(checkExistName({ username: user.username, name }));
      setEqualName(false);
    } else {
      // 이름이 같으면
      if (name) {
        setEqualName(true); // 상태 갱신
      } else {
        // 공백일 때
        console.log('실행');
        dispatch(checkExistName({ username: user.username, name })); // 요청해서 공백일 떄의 결과 값을 갱신 한다
      }
    }
  }, [dispatch, form, user]);

  useEffect(() => {
    const { name } = user ? user : '';
    dispatch(changeField({ form: 'profile', key: 'name', value: name }));
    loadingForm.current = false;
  }, [dispatch, user]);

  useEffect(() => {
    if (updateUser) {
      dispatch(check());
      setSubmitMessage('성공적으로 수정되었습니다.');
      dispatch(initializeUpdateName());
    } else if (updateUserError) {
      setErrorMessage('에러가 발생했습니다.');
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
      validName={validName}
      nameMessage={nameMessage}
      isNotExistNameError={isNotExistNameError}
      equalName={equalName}
      submitMessage={submitMessage}
      errorMessage={errorMessage}
    />
  );
};

export default ProfileContainer;
