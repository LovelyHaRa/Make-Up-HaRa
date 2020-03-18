import React from 'react';
import styled, { css } from 'styled-components';
import palette from '../../lib/styles/open-color';
import { Link } from 'react-router-dom';

const buttonStyle = css`
  border: none;
  border-radius: 2px;
  font-size: 1rem;
  font-weight: normal;
  padding: 0.25rem 1rem;
  color: #fff;
  outline: none;
  cursor: pointer;

  background: ${palette.gray[9]};
  &:hover {
    background: ${palette.gray[7]};
  }

  ${props =>
    props.indigo &&
    css`
      background: ${palette.indigo[9]};
      &:hover {
        background: ${palette.indigo[7]};
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
    props.indigo &&
    css`
      background: none;
      color: ${palette.gray[0]};
      border: 1px solid ${palette.gray[0]};
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
