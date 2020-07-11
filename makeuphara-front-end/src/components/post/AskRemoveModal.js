import React from 'react';
import { AskModal } from '../common/Modal';

export const AskPostRemoveModal = ({
  className,
  visible,
  onConfirm,
  onCancel,
}) => {
  return (
    <AskModal
      className={className}
      visible={visible}
      title="DELETE POST"
      description="정말 POST를 삭제하시겠습니까?"
      confirmText="삭제"
      onConfirm={onConfirm}
      onCancel={onCancel}
    />
  );
};

export const AskCommentRemoveModal = ({
  className,
  visible,
  onConfirm,
  onCancel,
}) => {
  return (
    <AskModal
      className={className}
      visible={visible}
      title="DELETE COMMENT"
      description="정말 COMMENT를 삭제하시겠습니까?"
      confirmText="삭제"
      onConfirm={onConfirm}
      onCancel={onCancel}
    />
  );
};
