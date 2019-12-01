import React from "react";
import { Theme, themes } from "../../theme";

const THEME_STORAGE_KEY = "hova_labs_theme";

type ThemeKey = keyof typeof themes;
type ThemeContextValue = {
  theme: Theme;
  setTheme: (input: ThemeKey) => void;
};
interface ThemeContextContainerProps {
  children: React.ReactNode;
}

const getStoredTheme = (): ThemeKey | undefined => {
  const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);
  if (storedTheme) {
    if (!Object.keys(themes).includes(storedTheme)) {
      console.error("Unsupported theme. Resetting theme now");
      localStorage.removeItem(THEME_STORAGE_KEY);
    } else {
      return storedTheme as ThemeKey;
    }
  }
  return undefined;
};

/**
 * https://medium.com/@jonas_duri/enable-dark-mode-with-css-variables-and-javascript-today-66cedd3d7845
 * Sets a color scheme for the website.
 * If browser supports "prefers-color-scheme" it will respect the setting for light or dark mode
 * otherwise it will set a dark theme during night time
 */
const getTheme = (): ThemeKey => {
  const storedTheme = getStoredTheme();
  if (storedTheme) {
    return storedTheme;
  }

  const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const isLightMode = window.matchMedia("(prefers-color-scheme: light)")
    .matches;
  const isNotSpecified = window.matchMedia(
    "(prefers-color-scheme: no-preference)"
  ).matches;
  const hasNoSupport = !isDarkMode && !isLightMode && !isNotSpecified;

  if (isDarkMode) return "darkTheme";
  if (isLightMode) return "lightTheme";
  if (isNotSpecified || hasNoSupport) {
    //  No preference for a color scheme or browser does not support it. Schedule dark mode during night time.
    const now = new Date();
    const hour = now.getHours();
    if (hour < 6 || hour >= 18) {
      return "darkTheme";
    }
    return "lightTheme";
  }
  return "lightTheme";
};

export const themeContextInitialValue: ThemeContextValue = {
  theme: themes[getTheme()],
  setTheme: () => {}
};

export const ThemeContext = React.createContext<ThemeContextValue>(
  themeContextInitialValue
);

export const ThemeContextContainer = ({
  children
}: ThemeContextContainerProps): React.ReactNode => {
  const [theme, setThemeState] = React.useState(themes[getTheme()]);

  React.useEffect(() => {
    window.matchMedia("(prefers-color-scheme: dark)").addListener(e => {
      if (!e.matches) {
        return;
      }
      if (getStoredTheme()) {
        return;
      }
      setThemeState(themes.darkTheme);
    });

    window.matchMedia("(prefers-color-scheme: light)").addListener(e => {
      if (!e.matches) {
        return;
      }
      if (getStoredTheme()) {
        return;
      }
      setThemeState(themes.lightTheme);
    });
    // TODO: remove event listeners
  }, []);

  const setTheme = (themeKey: ThemeKey) => setThemeState(themes[themeKey]);

  const [themeContextValue] = React.useState({ theme, setTheme });

  return (
    <ThemeContext.Provider value={themeContextValue}>
      {children}
    </ThemeContext.Provider>
  );
};
