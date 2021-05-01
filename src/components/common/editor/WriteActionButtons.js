import React from 'react';
import styled from 'styled-components';
import Button from '../Button';

/**
 * 에디터 작성버튼
 */

const WriteActionButtonsBlock = styled.div`
  margin-top: 1rem;
  margin-bottom: 4rem;
  button + button {
    margin-left: 0.5rem;
  }
`;

const StyledButton = styled(Button)`
  height: 2.125rem;
`;

const WriteActionButtons = ({ type = 'blog', isEdit, onClick, onCancel }) => {
  const editorName = type === 'blog' ? '포스트' : '위키';
  return (
    <WriteActionButtonsBlock>
      <StyledButton cyan onClick={onClick}>
        {editorName} {isEdit ? '수정' : '등록'}
      </StyledButton>
      <StyledButton red onClick={onCancel}>
        취소
      </StyledButton>
    </WriteActionButtonsBlock>
  );
};

export default WriteActionButtons;
