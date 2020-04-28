import React, { useEffect } from 'react';
import WikiList from '../../components/wiki/WikiList';
import { useDispatch, useSelector } from 'react-redux';
import { unloadList, getSearchList } from '../../module/redux/wiki';
import qs from 'qs';
import { withRouter } from 'react-router-dom';

const WikiListContainer = ({ location }) => {
  // 액션 함수 불러오기
  const dispatch = useDispatch();
  // 전역 설정 불러오기
  const { documentList, error, loading } = useSelector(({ wiki, loading }) => ({
    documentList: wiki.documentList,
    error: wiki.documentListError,
    loading: loading['wiki/GET_SEARCH_LIST'],
  }));
  const { query } = qs.parse(location.search, { ignoreQueryPrefix: true });
  // 이벤트 정의하기
  useEffect(() => {
    dispatch(getSearchList({ query }));
    return () => {
      dispatch(unloadList());
    };
  }, [dispatch, query]);
  return (
    <WikiList documentList={documentList} error={error} loading={loading} />
  );
};

export default withRouter(WikiListContainer);
