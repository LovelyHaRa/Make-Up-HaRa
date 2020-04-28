import React, { useCallback, useEffect } from 'react';
import WikiSearch from '../../components/wiki/WikiSearch';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeField,
  getSearchList,
  unloadList,
} from '../../module/redux/wiki';
import { withRouter } from 'react-router-dom';

const WikiSearchContainer = ({ history }) => {
  // 액션 함수 불러오기
  const dispatch = useDispatch();
  // 전역 설정 불러오기
  const { query, documentList } = useSelector(({ wiki }) => ({
    query: wiki.query,
    documentList: wiki.documentList,
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
    dispatch(getSearchList({ query }));
  };

  useEffect(() => {
    if (documentList) {
      const topDocument = documentList[0];
      const { name } = topDocument;
      history.push(`/w/${name}`);
    }
    return () => {
      dispatch(unloadList());
    };
  }, [dispatch, history, documentList]);

  return (
    <WikiSearch
      onChangeField={onChangeField}
      onSearch={onSearch}
      onDirect={onDirect}
    />
  );
};

export default withRouter(WikiSearchContainer);
