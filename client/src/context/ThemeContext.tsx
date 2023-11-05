import { Children, ReactNode, createContext, useEffect, useState } from "react";

type PROPS = {
  children: ReactNode;
};
export type ContextType = {
  theme: string;
  toggle: Function;
};

const getFromLocalStorage = () => {
  const value = localStorage.getItem("theme");
  return value || "light";
};
export const ThemeContext = createContext<ContextType>({
  theme: getFromLocalStorage(),
  toggle: () => {},
});

export const ThemeContextProvider = ({ children }: PROPS) => {
  const [theme, setTheme] = useState(() => getFromLocalStorage());

  const toggle = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
};
