import React, { useEffect } from 'react';
import WikiViewer from '../../components/wiki/WikiViewer';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  readDocument,
  unloadDocument,
  setOriginalDocument,
} from '../../module/redux/wiki';
import qs from 'qs';

const WikiViewerContainer = ({ location, match, history }) => {
  // 액션 함수 불러오기
  const dispatch = useDispatch();
  // 전역 상태 불러오기
  const { docName } = match.params;
  const { document, error, loading } = useSelector(({ wiki, loading }) => ({
    document: wiki.document,
    error: wiki.documentError,
    loading: loading['wiki/READ_DOCUMENT'],
  }));
  const { r } = qs.parse(location.search, { ignoreQueryPrefix: true });

  // 이벤트 정의
  const onEdit = () => {
    dispatch(setOriginalDocument(document));
    history.push('/wiki/edit');
  };

  useEffect(() => {
    if (docName) {
      dispatch(readDocument({ id: docName, r }));
    } else {
      history.push('/w/MAKE UP HARA WIKI: 대문');
    }
    // 언마운트 될 때 포스트 데이터 제거
    return () => {
      dispatch(unloadDocument());
    };
  }, [dispatch, history, docName, r]);

  return (
    <WikiViewer
      document={document}
      error={error}
      loading={loading}
      onEdit={onEdit}
      docName={docName}
    />
  );
};

export default withRouter(WikiViewerContainer);
