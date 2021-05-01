import styled from 'styled-components';

/**
 * 에러를 보여주기 위한 컴포넌트
 */

const ErrorBlock = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 3rem;
  font-family: 'NanumBarunGothic';
  color: ${({ theme }) => theme.text};
  span + span {
    margin-top: 1rem;
  }
  .error-msg {
    color: ${({ theme }) => theme.errorText};
  }
`;

export default ErrorBlock;
