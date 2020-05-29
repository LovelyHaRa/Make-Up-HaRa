import React, { useEffect } from 'react';
import Activity from '../../components/profile/Activity';
import { useDispatch, useSelector } from 'react-redux';
import { getList, unloadList } from '../../module/redux/post';
import { getDocumentCount } from '../../module/redux/wiki';

const ActivityContainer = () => {
  const dispatch = useDispatch();
  const {
    user,
    postList,
    postCount,
    documentCount,
    postListError,
    documentCountError,
    loadingPost,
    loadingWiki,
  } = useSelector(({ user, post, wiki, loading }) => ({
    user: user.user,
    postList: post.postList,
    postCount: post.postCount,
    documentCount: wiki.documentCount,
    postListError: post.postListError,
    documentCountError: wiki.documentCountError,
    loadingPost: loading['post/GET_LIST'],
    loadingWiki: loading['wiki/GET_DOCUMENT_COUNT'],
  }));

  const { username } = user;
  useEffect(() => {
    if (username) {
      dispatch(getList({ username }));
      dispatch(getDocumentCount({ username }));
    }
    return () => {
      dispatch(unloadList());
    };
  }, [dispatch, username]);

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
    />
  );
};

export default ActivityContainer;