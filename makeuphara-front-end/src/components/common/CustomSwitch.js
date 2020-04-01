import styled from 'styled-components';
import Switch from '@material-ui/core/Switch';

export const DarkThemeSwitch = styled(Switch)`
  .MuiSwitch-colorSecondary.Mui-checked + .MuiSwitch-track {
    background-color: ${({ theme }) => theme.darkThemeSwitchTrack};
  }
  .MuiSwitch-switchBase {
    color: ${({ theme }) => theme.darkThemeSwitchBody};
  }
  .MuiSwitch-colorSecondary.Mui-checked {
    color: ${({ theme }) => theme.darkThemeSwitchBody};
  }
`;
