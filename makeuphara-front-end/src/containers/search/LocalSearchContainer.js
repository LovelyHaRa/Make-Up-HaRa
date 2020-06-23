import React, { useEffect } from 'react';
import Categories from '../../components/search/Categories';
import { withRouter } from 'react-router-dom';
import qs from 'qs';
import {
  TotalSearchOptionContainer,
  WikiSearchOptionContainer,
  BlogSearchOptionContainer,
} from './SearchOptionContainer';
import { useDispatch, useSelector } from 'react-redux';
import { getList } from '../../module/redux/post';
import BlogSearchResult from '../../components/search/BlogSearchResult';
import { getSearchList } from '../../module/redux/wiki';
import WikiSearchResult from '../../components/search/WikiSearchResult';
import { initialize } from '../../module/redux/search';
import {
  TotalPaginationContainer,
  WikiPaginationContainer,
  BlogPaginationContainer,
} from './PaginationContainer';
import NoResult from '../../components/search/NoResult';
import LoadingProgress from '../../components/common/LoadingProgress';

const LocalSearchContainer = ({ location }) => {
  const dispatch = useDispatch();
  const {
    postList,
    postListError,
    postListLoading,
    wikiList,
    wikiListError,
    wikiListLoading,
  } = useSelector(({ post, wiki, loading }) => ({
    postList: post.postList,
    postListError: post.postListError,
    postListLoading: loading['post/GET_LIST'],
    wikiList: wiki.searchList,
    wikiListError: wiki.searchListError,
    wikiListLoading: loading['wiki/GET_SEARCH_LIST'],
  }));
  const { query, blog, wiki, page, oldest, day, longest, shortest } = qs.parse(
    location.search,
    {
      ignoreQueryPrefix: true,
    },
  );

  useEffect(() => {
    if (query && query !== '') {
      dispatch(
        getList({ query, page, block: blog === 'true' ? 10 : 5, oldest, day }),
      );
      dispatch(
        getSearchList({
          query,
          page,
          block: wiki === 'true' ? 10 : 25,
          oldest,
          longest,
          shortest,
        }),
      );
    }
  }, [dispatch, query, page, oldest, day, longest, shortest, blog, wiki]);

  useEffect(() => {
    return () => {
      dispatch(initialize());
    };
  }, [dispatch]);

  if (wikiListLoading || postListLoading) {
    return (
      <>
        <Categories />
        <LoadingProgress customHeight={75} />
      </>
    );
  }

  return (
    <>
      <Categories />
      {!wiki && !blog && (
        <>
          <TotalSearchOptionContainer />
          {!wikiListLoading &&
          !postListLoading &&
          wikiList.length === 0 &&
          postList.length === 0 ? (
            <NoResult query={query} />
          ) : (
            <>
              <BlogSearchResult
                includeTitle
                query={query}
                postList={postList}
                error={postListError}
                postListLoading={postListLoading}
              />
              <WikiSearchResult
                includeTitle
                query={query}
                wikiList={wikiList}
                error={wikiListError}
                wikiListLoading={wikiListLoading}
              />
            </>
          )}
          {!postListLoading && !wikiListLoading && <TotalPaginationContainer />}
        </>
      )}
      {wiki && wiki === 'true' && (
        <>
          <WikiSearchOptionContainer />
          {!wikiListLoading && wikiList.length === 0 ? (
            <NoResult query={query} />
          ) : (
            <WikiSearchResult
              query={query}
              wikiList={wikiList}
              error={wikiListError}
              wikiListLoading={wikiListLoading}
            />
          )}
          {!wikiListLoading && <WikiPaginationContainer />}
        </>
      )}
      {blog && blog === 'true' && (
        <>
          <BlogSearchOptionContainer />
          {!postListLoading && postList.length === 0 ? (
            <NoResult query={query} />
          ) : (
            <BlogSearchResult
              query={query}
              postList={postList}
              error={postListError}
              postListLoading={postListLoading}
            />
          )}
          {!postListLoading && <BlogPaginationContainer />}
        </>
      )}
    </>
  );
};

export default withRouter(LocalSearchContainer);
