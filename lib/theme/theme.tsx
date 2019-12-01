import { Breakpoints, breakpointsDefault } from "./breakpoints";
import { Colors, colorsLightTheme, colorsDarkTheme } from "./colors";
import { Radii, radiiDefault } from "./radii";
import { Space, spaceDefault } from "./space";
import { Typography, typographyDefault } from "./typography";

export type Theme = {
  breakpoints: Breakpoints;
  colors: Colors;
  radii: Radii;
  space: Space;
  typography: Typography;
};

export const lightTheme: Theme = {
  breakpoints: breakpointsDefault,
  colors: colorsLightTheme,
  radii: radiiDefault,
  space: spaceDefault,
  typography: typographyDefault
};

export const darkTheme: Theme = {
  breakpoints: breakpointsDefault,
  colors: colorsDarkTheme,
  radii: radiiDefault,
  space: spaceDefault,
  typography: typographyDefault
};

export const themes = {
  lightTheme,
  darkTheme
};
