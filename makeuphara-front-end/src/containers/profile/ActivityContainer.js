import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import qs from 'qs';

import { getList, unloadList } from '../../module/redux/post';
import { getDocumentCount } from '../../module/redux/wiki';
import Activity from '../../components/profile/Activity';

const ActivityContainer = () => {
  // 액션 함수 불러오기
  const dispatch = useDispatch();
  // 전역 상태 불러오기
  const {
    user,
    postList,
    postCount,
    postLastPage,
    documentCount,
    postListError,
    documentCountError,
    loadingPost,
    loadingWiki,
  } = useSelector(({ user, post, wiki, loading }) => ({
    user: user.user,
    postList: post.postList,
    postCount: post.postCount,
    postLastPage: post.lastPage,
    documentCount: wiki.documentCount,
    postListError: post.postListError,
    documentCountError: wiki.documentCountError,
    loadingPost: loading['post/GET_LIST'],
    loadingWiki: loading['wiki/GET_DOCUMENT_COUNT'],
  }));
  const location = useLocation();

  // 이벤트 정의
  const { username } = user;
  const { page = 1 } = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });

  useEffect(() => {
    if (username) {
      dispatch(getList({ username, page }));
      dispatch(getDocumentCount({ username }));
    }
    return () => {
      dispatch(unloadList());
    };
  }, [dispatch, username, page]);

  const pagenationProps = useMemo(
    () => ({
      path: '/mypage/activity',
      query: '',
      page: parseInt(page, 10),
      lastPage: postLastPage,
    }),
    [page, postLastPage],
  );

  return (
    <Activity
      user={user}
      postList={postList}
      postCount={postCount}
      documentCount={documentCount}
      postListError={postListError}
      documentCountError={documentCountError}
      loadingPost={loadingPost}
      loadingWiki={loadingWiki}
      {...pagenationProps}
    />
  );
};

export default ActivityContainer;
