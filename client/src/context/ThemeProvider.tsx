import { ReactNode, useContext } from "react";
import { ThemeContext } from "./ThemeContext";

type PORPS = {
  children: ReactNode;
};

export default function ThemeProvider({ children }: PORPS) {
  const { theme } = useContext(ThemeContext);
  return <div className={theme}>{children}</div>;
}
