import React, { createContext, useMemo, useState } from "react";
import useCustomEffect from "../hooks/useCustomEffect.hook";

export interface ThemeContextProps {
  theme: string;
  setTheme: (theme: string) => void;
}

export type SpacingOptions = "compact" | "comfort" | "relax";
/**
 * Theme Context.
 */

export const ThemeContext = createContext<ThemeContextProps>({
  theme: "default",
  setTheme: () => {},
});

/**
 * Theme Context Provider.
 *
 * @param value string
 * @param children ReactNode
 * @returns ReactNode
 */
export const ThemeContextProvider = ({
  value = "default",
  children,
}: {
  value?: string;
  children: React.ReactNode;
}) => {
  const [theme, setTheme] = useState(value);

  useCustomEffect(() => {
    const storeTheme = localStorage.getItem("theme");
    console.log("storedTheme", storeTheme);
    applyTheme(storeTheme || "default");
  }, []);

  /**
   * Apply theme to 'html' tag on DOM.
   *
   * @param theme string
   */
  const applyTheme = (theme: string = "default") => {
    let newTheme = theme;
    const html = document.getElementsByTagName("html")[0];
    localStorage.setItem("theme", theme);
    (html as any).setAttribute("data-theme", newTheme);
  };

  /**
   * Handle Theme change.
   *
   * @param theme string
   */
  const handleThemeChange = (theme: string) => {
    setTheme(theme);
    applyTheme(theme);
  };

  /**
   * Current context value for theme.
   */
  const val = useMemo(
    () => ({
      theme,

      //   spacing,
      //   tableBorder,
      //   sidebarExpand,
      setTheme: handleThemeChange,
      //   setSpacing: handleSpacingChange,
      //   setTableBorder: handleTableBorderChange,
      //   setSidebarExpand,
    }),
    // [theme, mode, spacing, tableBorder, sidebarExpand]
    [theme]
  );

  return <ThemeContext.Provider value={val}>{children}</ThemeContext.Provider>;
};
