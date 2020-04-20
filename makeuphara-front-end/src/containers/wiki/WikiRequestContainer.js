import React, { useEffect } from 'react';
import WikiRequest from '../../components/wiki/WikiRequest';
import { useDispatch, useSelector } from 'react-redux';
import { getRequestList } from '../../module/redux/wiki';

const WikiRequestContainer = () => {
  // 액션 함수 불러오기
  const dispatch = useDispatch();

  // 전역 상태 불러오기
  const { requestList, error } = useSelector(({ wiki }) => ({
    requestList: wiki.requestList,
    error: wiki.requestListError,
  }));

  useEffect(() => {
    dispatch(getRequestList());
  }, [dispatch]);

  return <WikiRequest requestList={requestList} error={error} />;
};

export default WikiRequestContainer;
