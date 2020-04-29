import React, { useCallback, useEffect } from 'react';
import WikiSearch from '../../components/wiki/WikiSearch';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeField,
  unloadList,
  getDirectTitle,
  initialize,
} from '../../module/redux/wiki';
import { withRouter } from 'react-router-dom';

const WikiSearchContainer = ({ history }) => {
  // 액션 함수 불러오기
  const dispatch = useDispatch();
  // 전역 설정 불러오기
  const { query, directName } = useSelector(({ wiki }) => ({
    query: wiki.query,
    directName: wiki.directName,
  }));
  // 이벤트 정의
  const onChangeField = useCallback(
    (payload) => dispatch(changeField(payload)),
    [dispatch],
  );

  const onSearch = () => {
    history.push(`/wiki/list?query=${query}`);
  };

  const onDirect = () => {
    dispatch(getDirectTitle({ query }));
  };

  useEffect(() => {
    if (directName) {
      history.push(`/w/${directName}`);
      dispatch(initialize());
    }
    return () => {
      dispatch(unloadList());
    };
  }, [dispatch, history, directName]);

  return (
    <WikiSearch
      onChangeField={onChangeField}
      onSearch={onSearch}
      onDirect={onDirect}
    />
  );
};

export default withRouter(WikiSearchContainer);
