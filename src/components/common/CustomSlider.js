import styled from 'styled-components';
import Slider from '@material-ui/core/Slider';

/**
 * 커스텀 페이지 슬라이더
 */

export const PageSlider = styled(Slider)`
  &.MuiSlider-root {
    flex: 1;
    margin-top: -0.5rem;
    color: ${({ theme }) => theme.sliderTrack};
  }
  & span.MulSlider-makr:first-of-type {
    width: 0;
  }
  .MuiSlider-thumb {
    height: 1.5rem;
    width: 1.5rem;
    background-color: ${({ theme }) => theme.sliderRail};
    border: 2px solid ${({ theme }) => theme.sliderTrack};
    margin-top: -0.5rem;
    margin-left: -0.75rem;
  }
  .MuiSlider-mark {
    height: 0.5rem;
    width: 1px;
    background-color: ${({ theme }) => theme.sliderRail};
  }
  .MuiSlider-track {
    height: 0.5rem;
  }
  .MuiSlider-rail {
    height: 0.5rem;
  }
`;

export default null;
