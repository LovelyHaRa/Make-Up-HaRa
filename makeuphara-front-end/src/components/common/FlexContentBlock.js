import styled from 'styled-components';
import Responsive from './Responsive';

const FlexContentBlock = styled(Responsive)`
  display: flex;
  flex-direction: ${(props) =>
    props.direction === 'column' ? 'column' : 'row'};
`;

export default FlexContentBlock;
