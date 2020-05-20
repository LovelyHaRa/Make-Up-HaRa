import React, { useEffect, useState, useRef } from 'react';
import Profile from '../../components/profile/Profile';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  changeField,
  checkExistName,
  check,
  initializeUpdateName,
  updateName,
} from '../../module/redux/user';

const ProfileContainer = ({ history }) => {
  const dispatch = useDispatch();
  const {
    user,
    form,
    existName,
    existNameError,
    updateUser,
    updateUserError,
  } = useSelector(({ user }) => ({
    user: user.user,
    form: user.profile,
    existName: user.existName,
    existNameError: user.existNameError,
    updateUser: user.updateUser,
    updateUserError: user.updateUserError,
  }));

  const [validName, setValidName] = useState(true); // 사용 가능한 이름 여부
  const [equalName, setEqualName] = useState(true); // 기존 사용자 이름이랑 일치하는지 여부
  const [nameMessage, setNameMessage] = useState(''); // 검증 실패 메시지
  const [submitMessage, setSubmitMessage] = useState(''); // submit 결과 메시지
  const [errorMessage, setErrorMessage] = useState(''); // submit 에러 메시지
  const loadingForm = useRef(true);

  if (!user) {
    history.replace('/login');
  }
  // input 상태 반영
  const onChange = (e) => {
    setNameMessage('');
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
    if (!existName || (existName && existName.result)) {
      setValidName(true);
    } else {
      // 상태 업데이트
      setValidName(false);
      setEqualName(false);
      setNameMessage(existName ? existName.message : ''); // 메시지 저장
    }
    setSubmitMessage('');
  }, [existName]);

  useEffect(() => {
    if (loadingForm.current) return;
    const { name } = form;
    const loginName = user ? user.name : '';
    // 이름이 현재 사용자 이름이랑 다르면
    if (name && name.toLowerCase() !== loginName.toLowerCase()) {
      // 이름이 사용 가능한지 비동기로 요청
      dispatch(checkExistName(name));
      setEqualName(false);
    } else {
      // 이름이 같으면
      if (name) {
        setEqualName(true); // 상태 갱신
      } else {
        // 공백일 때
        dispatch(checkExistName(name)); // 요청해서 공백일 떄의 결과 값을 갱신 한다
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

  return (
    <Profile
      user={user}
      form={form}
      onChange={onChange}
      onSubmit={onSubmit}
      validName={validName}
      nameMessage={nameMessage}
      existNameError={existNameError}
      equalName={equalName}
      submitMessage={submitMessage}
      errorMessage={errorMessage}
    />
  );
};

export default withRouter(ProfileContainer);
