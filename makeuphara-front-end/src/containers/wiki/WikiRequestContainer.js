import React, { useCallback, useEffect } from 'react';
import WikiRequest from '../../components/wiki/WikiRequest';
import { useDispatch, useSelector } from 'react-redux';
import { getRequestList, setTitle } from '../../module/redux/wiki';
import { withRouter } from 'react-router-dom';

const WikiRequestContainer = ({ history }) => {
  // 액션 함수 불러오기
  const dispatch = useDispatch();

  // 전역 상태 불러오기
  const { requestList, loading, error } = useSelector(({ wiki, loading }) => ({
    requestList: wiki.requestList,
    loading: loading['wiki/GET_REQUEST_LIST'],
    error: wiki.requestListError,
  }));

  // 이벤트 정의
  const onEdit = useCallback(
    (title) => {
      dispatch(setTitle(title));
      history.push('/wiki/edit');
    },
    [dispatch, history],
  );

  useEffect(() => {
    dispatch(getRequestList());
  }, [dispatch]);

  return (
    <WikiRequest
      requestList={requestList}
      loading={loading}
      error={error}
      onEdit={onEdit}
    />
  );
};

export default withRouter(WikiRequestContainer);
