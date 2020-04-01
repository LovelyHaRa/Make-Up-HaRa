import palette from './open-color';

export const lightTheme = {
  /* Header */
  body: '#fff',
  text: palette.gray[9],
  hoverText: palette.gray[6],
  hoverList: palette.gray[2],
  inputBody: palette.gray[1],
  placeholder: palette.gray[7],
  btnBody: palette.gray[1],
  dropdownBody: '#fff',
  /* AuthForm */
  loginBody: palette.gray[2],
  loginInputBorder: palette.gray[5],
  loginInputBorderFocus: palette.gray[7],
  /* DarkThemeSwitch */
  darkThemeSwitchBody: palette.gray[7],
  darkThemeSwitchTrack: palette.gray[5],
};

export const darkTheme = {
  /* Header */
  body: palette.gray[9],
  text: '#fff',
  hoverText: palette.gray[3],
  hoverList: palette.gray[7],
  inputBody: palette.gray[7],
  placeholder: palette.gray[2],
  btnBody: palette.gray[8],
  dropdownBody: palette.gray[9],
  /* AuthForm */
  loginBody: palette.gray[7],
  loginInputBorder: palette.gray[5],
  loginInputBorderFocus: palette.gray[3],
  /* DarkThemeSwitch */
  darkThemeSwitchBody: '#fff',
  darkThemeSwitchTrack: palette.gray[2],
};
