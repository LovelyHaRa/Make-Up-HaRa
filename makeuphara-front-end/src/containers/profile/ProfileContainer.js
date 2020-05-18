import React, { useEffect, useState } from 'react';
import Profile from '../../components/profile/Profile';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { changeField, checkExistName } from '../../module/redux/user';

const ProfileContainer = ({ history }) => {
  const dispatch = useDispatch();
  const { user, form, existName, existNameError } = useSelector(({ user }) => ({
    user: user.user,
    form: user.profile,
    existName: user.existName,
    existNameError: user.existNameError,
  }));

  const [validName, setValidName] = useState(true); // 사용 가능한 이름 여부
  const [equalName, setEqualName] = useState(true); // 기존 사용자 이름이랑 일치하는지 여부
  const [nameMessage, setNameMessage] = useState(''); // 검증 실패 메시지

  if (!user) {
    history.replace('/login');
  }
  // input 상태 반영
  const onChange = (e) => {
    const { value, name } = e.target;
    dispatch(changeField({ form: 'profile', key: name, value }));
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
  }, [existName]);

  useEffect(() => {
    dispatch(changeField({ form: 'profile', key: 'name', value: user.name }));
  }, [dispatch, user.name]);

  useEffect(() => {
    const { name } = form;
    // 이름이 현재 사용자 이름이랑 다르면
    if (name && name !== user.name) {
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
  }, [dispatch, form, user.name]);

  return (
    <Profile
      user={user}
      form={form}
      onChange={onChange}
      validName={validName}
      nameMessage={nameMessage}
      existNameError={existNameError}
      equalName={equalName}
    />
  );
};

export default withRouter(ProfileContainer);
