import React from 'react';
import { AskModal } from '../common/Modal';

const AskRemoveModal = ({ className, visible, onConfirm, onCancel }) => {
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

export default AskRemoveModal;
