import styled from 'styled-components';

/**
 * 다크모드 활성화에 따른 배경색 변경을 위한 컴포넌트
 */

const BodyBlock = styled.div`
  position: fixed;
  top: ${(props) => (props.includeHeader ? '3rem' : 0)};
  left: 0;
  right: 0;
  bottom: 0;
  background: ${({ theme }) => theme.body};
  z-index: -1;
`;

export default BodyBlock;
