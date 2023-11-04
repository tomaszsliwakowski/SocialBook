import { useState } from "react";
import styles from "./header.module.css";

export default function ThemeToggle() {
  const [theme, setTheme] = useState("light");
  return (
    <div
      className={styles.header__theme}
      style={
        theme === "dark"
          ? { backgroundColor: "white" }
          : { backgroundColor: "#0f172a" }
      }
    >
      <img src="/moon.png" alt="" width={14} height={14} />
      <div
        className={styles.header__theme__ball}
        style={
          theme === "dark"
            ? { left: 1, background: "#0f172a" }
            : { right: 1, background: "white" }
        }
      ></div>
      <img src="/sun.png" alt="" width={14} height={14} />
    </div>
  );
}
