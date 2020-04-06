import React, { useState } from 'react';
import styled from 'styled-components';
import AskRemoveModal from './AskRemoveModal';

const PostActionButtionsBlock = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 2rem;
  margin-top: 1.5rem;
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

const PostActionButtions = ({ onEdit, onRemove }) => {
  const [modal, setModal] = useState(false);

  const onRemoveClick = () => {
    setModal(true);
  };
  const onCancel = () => {
    setModal(false);
  };
  const onConfirm = () => {
    setModal(false);
    onRemove();
  };

  /* 모달 영역 밖 클릭시 모달 닫기 */
  window.onclick = event => {
    if (event.target.className.includes('modal')) {
      setModal(false);
    }
  };

  return (
    <>
      <PostActionButtionsBlock>
        <ActionButton onClick={onEdit}>수정</ActionButton>
        <ActionButton onClick={onRemoveClick}>삭제</ActionButton>
      </PostActionButtionsBlock>
      <AskRemoveModal
        className="modal"
        visible={modal}
        onConfirm={onConfirm}
        onCancel={onCancel}
      />
    </>
  );
};

export default PostActionButtions;
