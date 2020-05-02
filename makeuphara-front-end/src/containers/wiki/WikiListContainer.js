import React, { useEffect } from 'react';
import WikiList from '../../components/wiki/WikiList';
import { useDispatch, useSelector } from 'react-redux';
import { unloadList, getSearchList } from '../../module/redux/wiki';
import qs from 'qs';
import { withRouter } from 'react-router-dom';
import Categories from '../../components/wiki/Categories';

const isValidQuery = (oldest, shortest, longest) => {
  if (oldest !== undefined && shortest !== undefined) {
    return false;
  }
  if (shortest !== undefined && longest !== undefined) {
    return false;
  }
  if (oldest !== undefined && longest !== undefined) {
    return false;
  }
  if (oldest !== undefined && shortest !== undefined && longest !== undefined) {
    return false;
  }
  return true;
};

const WikiListContainer = ({ location, history }) => {
  // 액션 함수 불러오기
  const dispatch = useDispatch();
  // 전역 설정 불러오기
  const { searchList, error, loading } = useSelector(({ wiki, loading }) => ({
    searchList: wiki.searchList,
    error: wiki.searchListError,
    loading: loading['wiki/GET_SEARCH_LIST'],
  }));
  const { query, oldest, shortest, longest } = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });
  // 이벤트 정의하기
  useEffect(() => {
    if (isValidQuery(oldest, shortest, longest)) {
      dispatch(getSearchList({ query, oldest, shortest, longest }));
    } else {
      history.replace(`/wiki/list?query=${query}`);
    }
  }, [dispatch, history, query, oldest, shortest, longest]);
  return (
    <>
      <Categories />
      <WikiList documentList={searchList} error={error} loading={loading} />
    </>
  );
};

export default withRouter(WikiListContainer);
