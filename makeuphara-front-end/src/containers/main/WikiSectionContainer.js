import React from 'react';
import WikiSection from '../../components/main/WikiSection';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getDocumentList, unloadList } from '../../module/redux/wiki';

const WikiSectionContainer = () => {
  // 액션 함수 불러오기
  const dispatch = useDispatch();
  // 전역 상태 불러오기
  const { documentList, error, loading } = useSelector(({ wiki, loading }) => ({
    documentList: wiki.documentList,
    error: wiki.documentListError,
    loading: loading['wiki/GET_DOCUMENT_LIST'],
  }));

  useEffect(() => {
    dispatch(getDocumentList({ block: 5 }));
    return () => {
      dispatch(unloadList());
    };
  }, [dispatch]);

  return (
    <WikiSection documentList={documentList} error={error} loading={loading} />
  );
};

export default WikiSectionContainer;
