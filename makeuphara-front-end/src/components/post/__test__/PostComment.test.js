import React from 'react';
import moment from 'moment';

import { fireEvent, render } from '@testing-library/react';

import { sampleCommentList as commentList } from '../../../lib/data/test';
import PostComment, { CommentItem } from '../PostComment';
import PostActionButtons from '../PostActionButtons';

const props = {
  commentList,
  loading: false,
  count: commentList.length,
  commentInput: '',
  handleChange: jest.fn(),
  handleSubmit: jest.fn(),
  user: null,
  result: { state: false, message: '' },
  handleResultClose: jest.fn(),
  handleEdit: jest.fn(),
  handleRemove: jest.fn(),
};

const user = {
  _id: '5ed8faf8d3fb0639901ba49d',
  username: 'master',
  name: 'master',
};

const itemProps = {
  ...commentList[0],
  isOwner: false,
};
delete itemProps._id;

describe('<PostComment />', () => {
  it('should be render', () => {
    const { getByText, getByPlaceholderText } = render(
      <PostComment {...props} />,
    );

    expect(getByText(/댓글 [0-9]*/)).toBeInTheDocument();
    expect(
      getByPlaceholderText('로그인 후 댓글을 작성할 수 있습니다'),
    ).toBeInTheDocument();
  });

  it('should be render when user has been log in', () => {
    const nextProps = { ...props, user };
    const { getByText, getByPlaceholderText } = render(
      <PostComment {...nextProps} />,
    );

    expect(getByText(/댓글 [0-9]*/)).toBeInTheDocument();
    expect(getByPlaceholderText('댓글 입력')).toBeInTheDocument();
    const button = getByText('작성');
    expect(button).toBeInTheDocument();
    fireEvent.click(button);
    expect(props.handleSubmit).toBeCalled();
  });

  it('comment item should be render', () => {
    const { getByText } = render(<CommentItem {...itemProps} />);

    expect(getByText(itemProps.commenter.username)).toBeInTheDocument();
    expect(
      getByText(moment(itemProps.commentDate).format('YYYY-MM-DD HH:mm:ss')),
    ).toBeInTheDocument();
    expect(getByText(itemProps.body)).toBeInTheDocument();
  });

  it('comment item should be render when comment owner', () => {
    const nextProps = { ...itemProps, isOwner: true };
    const { getByText } = render(
      <CommentItem
        {...nextProps}
        actionButtons={
          <PostActionButtons
            type="comment"
            onEdit={jest.fn()}
            onRemove={jest.fn()}
          />
        }
      />,
    );

    expect(getByText(nextProps.commenter.username)).toBeInTheDocument();
    expect(
      getByText(moment(nextProps.commentDate).format('YYYY-MM-DD HH:mm:ss')),
    ).toBeInTheDocument();
    expect(getByText(nextProps.body)).toBeInTheDocument();
    const button = getByText('삭제');
    expect(button).toBeInTheDocument();
  });
});
