import React, { useEffect, useRef, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import qs from 'qs';
import { getList, unloadList } from '../../module/redux/post';
import PostList from '../../components/post/PostList';
import loadable from '@loadable/component';
const PaginationContainer = loadable(() => import('./PaginationContainer'));

const PostListContainer = ({ location, match }) => {
  // 액션 함수 불러오기
  const dispatch = useDispatch();
  // 전역 상태 불러오기
  const { postList, error, loading, user, isDarkTheme } = useSelector(
    ({ post, loading, user, theme }) => ({
      postList: post.postList,
      error: post.postListError,
      loading: loading['post/GET_LIST'],
      user: user.user,
      isDarkTheme: theme.isDarkTheme,
    }),
  );
  // 유저 정보는 path에서 불러오기
  const { username } = match.params;
  // tag, page는 쿼리에서 불러오기
  const { tag, page } = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });
  const [block, setBlock] = useState(10);
  const handlePageBlock = (e, newValue) => {
    setBlock(newValue);
  };

  const pagination = useRef(false);

  useEffect(() => {
    pagination.current = false;
    dispatch(getList({ username, tag, page }));
    pagination.current = true;
    return () => {
      dispatch(unloadList());
      pagination.current = false;
    };
  }, [dispatch, tag, page, username]);

  useEffect(() => {
    dispatch(getList({ username, tag, page, block }));
  }, [dispatch, tag, page, username, block]);

  return (
    <>
      <PostList
        loading={loading}
        error={error}
        postList={postList}
        showWriteButton={user}
        isDarkTheme={isDarkTheme}
        username={username}
        tag={tag}
        block={block}
        handlePageBlock={handlePageBlock}
      />
      {pagination.current && !loading && !error && <PaginationContainer />}
    </>
  );
};

export default withRouter(PostListContainer);
