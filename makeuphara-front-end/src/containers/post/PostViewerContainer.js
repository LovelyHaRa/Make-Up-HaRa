import React, { useEffect } from 'react';
import PostViewer from '../../components/post/PostViewer';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { readPost, unloadPost, setOriginalPost } from '../../module/redux/post';
import PostActionButtions from '../../components/post/PostActionButtions';
import { removePost } from '../../lib/api/post';
import loadable from '@loadable/component';

const PostCommentContainer = loadable(() =>
  import('../../containers/post/PostCommentContainer'),
);

const PostViewerContainer = ({ match, history }) => {
  // 액션 함수 불러오기
  const dispatch = useDispatch();
  // 전역 상태 불러오기
  const { postId } = match.params;
  const { post, error, loading, user } = useSelector(
    ({ post, loading, user }) => ({
      post: post.post,
      error: post.postError,
      loading: loading['post/READ_POST'],
      user: user.user,
    }),
  );

  // 이벤트 정의
  const onEdit = () => {
    dispatch(setOriginalPost(post));
    history.push('/blog/write');
  };

  const onRemove = async () => {
    try {
      await removePost(postId);
      history.push('/blog');
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    dispatch(readPost(postId));
    // 언마운트 될 때 포스트 데이터 제거
    return () => {
      dispatch(unloadPost());
    };
  }, [dispatch, postId]);

  const isPublisher =
    (post && post.publisher.username) === (user && user.username);

  return (
    <>
      <PostViewer
        post={post}
        loading={loading}
        error={error}
        actionButtons={
          isPublisher && (
            <PostActionButtions onEdit={onEdit} onRemove={onRemove} />
          )
        }
      />
      {!loading && !error && <PostCommentContainer />}
    </>
  );
};

export default withRouter(PostViewerContainer);
