import styled from 'styled-components';

const BodyBlock = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${({ theme }) => theme.body};
  z-index: -1;
`;

export default BodyBlock;
