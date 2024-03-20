import { useContext } from "react";
import styles from "./header.module.css";
import { ThemeContext } from "../../context/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggle } = useContext(ThemeContext);
  return (
    <div
      className={styles.header__theme}
      onClick={() => toggle()}
      style={
        theme === "dark"
          ? { backgroundColor: "white" }
          : { backgroundColor: "#0f172a" }
      }
    >
      <img
        src="https://res.cloudinary.com/dhte02cxo/image/upload/v1710943204/moon_smlg6b.png"
        alt=""
        width={14}
        height={14}
      />
      <div
        className={styles.header__theme__ball}
        style={
          theme === "dark"
            ? { left: 1, background: "#0f172a" }
            : { right: 1, background: "white" }
        }
      ></div>
      <img
        src="https://res.cloudinary.com/dhte02cxo/image/upload/v1710943246/sun_qdmejr.png"
        alt=""
        width={14}
        height={14}
      />
    </div>
  );
}
