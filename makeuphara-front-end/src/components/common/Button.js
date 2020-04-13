import React from 'react';
import styled, { css } from 'styled-components';
import palette from '../../lib/styles/open-color';
import { Link } from 'react-router-dom';

/**
 * 소셜 로그인 버튼에서 css를 사용하기 위해 export
 * 소셜 로그인은 ref를 설정해주어야 하기 때문에 prop 전달이 어려움
 */
export const buttonStyle = css`
  border: none;
  border-radius: 2px;
  font-size: 1rem;
  font-weight: normal;
  padding: 0.25rem 1rem;
  color: ${({ theme }) => theme.btnText};
  outline: none;
  cursor: pointer;
  background: ${({ theme }) => theme.btnBody};

  &:hover {
    background: ${({ theme }) => theme.btnHoverBody};
  }

  &:disabled,
  &[disabled] {
    cursor: default;
    background: ${({ theme }) => theme.btnHoverBody};
  }

  ${props =>
    props.fullWidth &&
    css`
      padding-top: 0.75rem;
      padding-bottom: 0.75rem;
      width: 100%;
      display: inline-block;
      box-sizing: border-box;
      text-align: center;
    `}

  ${props =>
    props.indigo &&
    css`
      background: ${palette.indigo[9]};
      &:hover {
        background: ${palette.indigo[7]};
      }
    `}
  ${props =>
    props.violet &&
    css`
      background: ${palette.violet[9]};
      color: #fff;
      &:hover {
        background: ${palette.violet[7]};
      }
    `}

  ${props =>
    props.red &&
    css`
      background: ${palette.red[8]};
      &:hover {
        background: ${palette.red[6]};
      }
    `}

  ${props =>
    props.cyan &&
    css`
      background: ${palette.cyan[6]};
      &:hover {
        background: ${palette.cyan[4]};
      }
    `}
  ${props =>
    props.yellow &&
    css`
      background: ${palette.yellow[5]};
      &:hover {
        background: ${palette.yellow[3]};
      }
    `}
  ${props =>
    props.transparent &&
    css`
      background: none;
      color: ${({ theme }) => theme.text};
      border: 1px solid ${({ theme }) => theme.text};
      &:hover {
        background: ${palette.gray[1]};
        color: ${palette.gray[7]};
      }
    `}
`;

const StyledButton = styled.button`
  ${buttonStyle}
`;

const StyledLink = styled(Link)`
  ${buttonStyle}
`;

const Button = props => {
  return props.to ? <StyledLink {...props} /> : <StyledButton {...props} />;
};

export default Button;
