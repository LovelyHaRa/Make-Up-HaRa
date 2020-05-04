import styled from 'styled-components';

const ErrorBlock = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 3rem;
  color: ${({ theme }) => theme.text};
  span + span {
    margin-top: 1rem;
  }
  .error-msg {
    color: ${({ theme }) => theme.errorText};
  }
`;

export default ErrorBlock;
