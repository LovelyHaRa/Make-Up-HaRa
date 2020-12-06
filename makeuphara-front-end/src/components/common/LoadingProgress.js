import React from 'react';
import styled, { css } from 'styled-components';
import CircularProgress from '@material-ui/core/CircularProgress';

/**
 * 로딩 프로그래스 컴포넌트
 */

const LoadingProgressBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  &.full-height {
    height: 100vh;
  }
  &.body-height {
    height: 90vh;
  }
  ${(props) =>
    props.customHeight &&
    css`
      height: ${props.customHeight}vh;
    `}
`;

const CustomCircularProgress = styled(CircularProgress)`
  &.MuiCircularProgress-colorPrimary {
    color: ${({ theme }) => theme.categoryBorder};
  }
`;

const LoadingProgress = (props) => {
  const { full, body } = props;
  return (
    <LoadingProgressBlock
      {...props}
      className={(full && 'full-height', body && 'body-height')}
    >
      <CustomCircularProgress />
    </LoadingProgressBlock>
  );
};

export default LoadingProgress;
