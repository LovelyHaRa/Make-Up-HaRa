import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import WikiSearch from '../../components/wiki/WikiSearch';
import {
  changeField,
  getDirectTitle,
  initialize,
  getRandomTitle,
} from '../../module/redux/wiki';

const WikiSearchContainer = ({ history }) => {
  // 액션 함수 불러오기
  const dispatch = useDispatch();
  // 전역 설정 불러오기
  const { query, directName, randomTitle } = useSelector(({ wiki }) => ({
    query: wiki.query,
    directName: wiki.directName,
    randomTitle: wiki.randomTitle,
  }));
  // 이벤트 정의
  const onChangeField = useCallback(
    (payload) => dispatch(changeField(payload)),
    [dispatch],
  );

  const onSearch = useCallback(() => {
    if (query === '') {
      history.push('/wiki/list');
    } else {
      history.push(`/wiki/list?query=${query}`);
    }
  }, [history, query]);

  const onDirect = useCallback(() => {
    dispatch(getDirectTitle({ query }));
  }, [dispatch, query]);

  const onShuffle = useCallback(() => {
    dispatch(getRandomTitle());
  }, [dispatch]);

  // 다이렉트 이동
  useEffect(() => {
    if (directName) {
      history.push(`/w/${directName}`);
      dispatch(initialize());
    }
  }, [dispatch, history, directName]);

  // 랜덤 문서 이동
  useEffect(() => {
    if (randomTitle) {
      history.push(`/w/${randomTitle}`);
      dispatch(initialize());
    }
  }, [dispatch, history, randomTitle]);

  return (
    <WikiSearch
      query={query}
      onChangeField={onChangeField}
      onSearch={onSearch}
      onDirect={onDirect}
      onShuffle={onShuffle}
    />
  );
};

export default withRouter(WikiSearchContainer);
