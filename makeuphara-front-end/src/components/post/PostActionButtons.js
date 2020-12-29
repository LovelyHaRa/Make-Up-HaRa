import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { AskPostRemoveModal, AskCommentRemoveModal } from './AskRemoveModal';

const PostActionButtonsBlock = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const ActionButton = styled.button`
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  color: ${({ theme }) => theme.postActionButtonText};
  background: ${({ theme }) => theme.postActionButtonBody};
  font-weight: 600;
  border: none;
  outline: none;
  font-size: 0.875rem;
  cursor: pointer;
  & + & {
    margin-left: 0.25rem;
  }
  &:hover {
    color: ${({ theme }) => theme.postActionButtonHoverText};
    background: ${({ theme }) => theme.postActionButtonHoverBody};
  }
`;

const PostActionButtons = ({ type = 'post', onEdit, onRemove }) => {
  const [modal, setModal] = useState(false);

  const onRemoveClick = useCallback(() => {
    setModal(true);
  }, []);
  const onCancel = useCallback(() => {
    setModal(false);
  }, []);
  const onConfirm = useCallback(() => {
    setModal(false);
    onRemove();
  }, [onRemove]);

  /* 모달 영역 밖 클릭시 모달 닫기 */
  useEffect(() => {
    window.onclick = (event) => {
      if (
        !!event.target.className.includes &&
        event.target.className.includes('modal')
      ) {
        setModal(false);
      }
    };
    // 언마운트시 이벤트 제거
    return () => {
      window.onclick = () => {};
    };
  });

  return (
    <>
      <PostActionButtonsBlock>
        {type === 'post' && <ActionButton onClick={onEdit}>수정</ActionButton>}
        <ActionButton onClick={onRemoveClick}>삭제</ActionButton>
      </PostActionButtonsBlock>
      {type === 'post' ? (
        <AskPostRemoveModal
          className="modal"
          visible={modal}
          onConfirm={onConfirm}
          onCancel={onCancel}
        />
      ) : (
        <AskCommentRemoveModal
          className="modal"
          visible={modal}
          onConfirm={onConfirm}
          onCancel={onCancel}
        />
      )}
    </>
  );
};

export default PostActionButtons;
