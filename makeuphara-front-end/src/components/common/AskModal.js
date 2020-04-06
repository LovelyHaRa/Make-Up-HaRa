import React from 'react';
import styled from 'styled-components';
import Button from './Button';

const FullScreen = styled.div`
  position: fixed;
  z-index: 30;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${({ theme }) =>
    theme.body === '#fff' ? 'rgba(0, 0, 0, 0.25)' : 'rgba(0, 0, 0, 0.45)'};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AskModalBlock = styled.div`
  width: 320px;
  background: ${({ theme }) => theme.body};
  color: ${({ theme }) => theme.text};
  padding: 1.5rem;
  border-radius: 4px;
  box-shadow: ${({ theme }) =>
    theme.body === '#fff'
      ? '0 0 5px 2px rgba(0, 0, 0, 0.15)'
      : '0 0 5px 2px rgba(0, 0, 0, 0.35)'};
  h2 {
    margin-top: 0;
    margin-bottom: 1rem;
    font-size: 1.25rem;
    font-weight: 500;
  }
  p {
    margin-bottom: 3rem;
  }
  .buttons {
    display: flex;
    justify-content: flex-end;
  }
`;

const StyledButton = styled(Button)`
  height: 2rem;
  & + & {
    margin-left: 0.75rem;
  }
`;

const AskModal = ({
  className,
  visible,
  title,
  description,
  confirmText = '확인',
  cancelText = '취소',
  onConfirm,
  onCancel,
}) => {
  return (
    visible && (
      <FullScreen className={className}>
        <AskModalBlock>
          <h2>{title}</h2>
          <p>{description}</p>
          <div className="buttons">
            <StyledButton onClick={onCancel}>{cancelText}</StyledButton>
            <StyledButton cyan onClick={onConfirm}>
              {confirmText}
            </StyledButton>
          </div>
        </AskModalBlock>
      </FullScreen>
    )
  );
};

export default AskModal;
