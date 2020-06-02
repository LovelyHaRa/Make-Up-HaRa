import React from 'react';
import { SingleInputModal } from '../common/Modal';

const InputBarcodeModal = ({ className, visible, onSubmit, onCancel }) => {
  return (
    <SingleInputModal
      className={className}
      visible={visible}
      title="바코드 등록"
      description="바코드 번호를 등록할 수 있습니다."
      inputLabel="BARCODE"
      inputName="barcode"
      submitText="코드 등록"
      onSubmit={onSubmit}
      onCancel={onCancel}
    />
  );
};

export default InputBarcodeModal;
