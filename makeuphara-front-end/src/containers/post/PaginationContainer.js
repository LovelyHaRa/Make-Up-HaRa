import React from 'react';
import { withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
import qs from 'qs';
import Pagination from '../../components/common/Pagination';

const PaginationContainer = ({ location, match }) => {
  // 전역 변수 불러오기
  const { postList, loading, lastPage } = useSelector(({ post, loading }) => ({
    postList: post.postList,
    loading: loading['post/GET_LIST'],
    lastPage: post.lastPage,
  }));

  // 포스트 데이터가 없거나 로딩 중이면 아무것도 보여주지 않음
  if (!postList || loading) return null;

  // page가 없으면 1을 기본으로 사용
  const { username } = match.params;
  const { tag, page = 1 } = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });
  const query = qs.stringify({ tag });

  return (
    <Pagination
      path={username ? `/blog/@${username}` : `/blog`}
      query={query}
      page={parseInt(page, 10)}
      lastPage={lastPage}
    />
  );
};

export default withRouter(PaginationContainer);
