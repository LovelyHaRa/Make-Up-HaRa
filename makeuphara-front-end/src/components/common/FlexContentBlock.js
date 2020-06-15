import styled from 'styled-components';
import Responsive from './Responsive';

/**
 * 최상의 flex 컴포넌트
 */

const FlexContentBlock = styled(Responsive)`
  display: flex;
  flex-direction: ${(props) =>
    props.direction === 'column' ? 'column' : 'row'};
`;

export default FlexContentBlock;
