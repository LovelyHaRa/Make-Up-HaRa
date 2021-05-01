import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import WikiHistory from '../../components/wiki/WikiHistory';
import { getHistoryList } from '../../module/redux/wiki';

const WikiHistoryContainer = ({ match }) => {
  // 액션 함수 불러오기
  const dispatch = useDispatch();
  // 전역 변수 불러오기
  const { historyList, error, loading } = useSelector(({ wiki, loading }) => ({
    historyList: wiki.historyList,
    error: wiki.historyListError,
    loading: loading['wiki/GET_HISTORY_LIST'],
  }));
  const { docName } = match.params;

  useEffect(() => {
    dispatch(getHistoryList({ id: docName }));
  }, [dispatch, docName]);

  return (
    <WikiHistory
      historyList={historyList}
      error={error}
      loading={loading}
      docName={docName}
    />
  );
};

export default withRouter(WikiHistoryContainer);
