import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getList, unloadList } from '../../module/redux/post';
import BlogSection from '../../components/main/BlogSection';

const BlogSectionContainer = () => {
  // 액션 함수 불러오기
  const dispatch = useDispatch();
  // 전역 상태 불러오기
  const { postList, postError, postLoading } = useSelector(
    ({ post, loading }) => ({
      postList: post.postList,
      postError: post.postListError,
      postLoading: loading['post/GET_LIST'],
    }),
  );

  useEffect(() => {
    dispatch(getList({ block: 5 }));
    return () => {
      dispatch(unloadList());
    };
  }, [dispatch]);

  return (
    <BlogSection
      postLoading={postLoading}
      postList={postList}
      postError={postError}
    />
  );
};

export default BlogSectionContainer;
