import React, { useCallback, useEffect } from 'react';
import WikiSearch from '../../components/wiki/WikiSearch';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeField,
  getDirectTitle,
  initialize,
  getRandomTitle,
} from '../../module/redux/wiki';
import { withRouter } from 'react-router-dom';

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

  const onSearch = () => {
    if (query === '') {
      history.push('/wiki/list');
    } else {
      history.push(`/wiki/list?query=${query}`);
    }
  };

  const onDirect = () => {
    dispatch(getDirectTitle({ query }));
  };

  const onShuffle = () => {
    dispatch(getRandomTitle());
  };

  useEffect(() => {
    if (directName) {
      history.push(`/w/${directName}`);
      dispatch(initialize());
    }
  }, [dispatch, history, directName]);

  useEffect(() => {
    if (randomTitle) {
      history.push(`/w/${randomTitle}`);
      dispatch(initialize());
    }
  }, [dispatch, history, randomTitle]);

  return (
    <WikiSearch
      onChangeField={onChangeField}
      onSearch={onSearch}
      onDirect={onDirect}
      onShuffle={onShuffle}
    />
  );
};

export default withRouter(WikiSearchContainer);
