import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getList, unloadList as postUnload } from '../../module/redux/post';
import {
  getDocumentList,
  unloadList as wikiUnload,
} from '../../module/redux/wiki';
import LoadingProgress from '../../components/common/LoadingProgress';
import BlogSection from '../../components/main/BlogSection';
import WikiSection from '../../components/main/WikiSection';

const MainContainer = () => {
  // 액션 함수 불러오기
  const dispatch = useDispatch();
  // 전역 상태 불러오기
  const {
    postList,
    postError,
    postLoading,
    documentList,
    documentError,
    documentLoading,
  } = useSelector(({ post, wiki, loading }) => ({
    postList: post.postList,
    postError: post.postListError,
    postLoading: loading['post/GET_LIST'],
    documentList: wiki.documentList,
    documentError: wiki.documentListError,
    documentLoading: loading['wiki/GET_DOCUMENT_LIST'],
  }));

  useEffect(() => {
    dispatch(getList({ block: 5 }));
    dispatch(getDocumentList({ block: 5 }));
    return () => {
      dispatch(postUnload());
      dispatch(wikiUnload());
    };
  }, [dispatch]);

  if (postLoading || documentLoading) {
    return <LoadingProgress body />;
  }

  return (
    <>
      <BlogSection
        postList={postList}
        loading={postLoading}
        error={postError}
      />
      <WikiSection
        documentList={documentList}
        loading={documentLoading}
        error={documentError}
      />
    </>
  );
};

export default MainContainer;
