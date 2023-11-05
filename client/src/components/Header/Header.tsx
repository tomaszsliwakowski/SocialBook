import ThemeToggle from "./ThemeToggle";
import styles from "./header.module.css";
import HeaderAuth from "./HeaderAuth";
import HeaderNav from "./Nav";

export default function Header() {
  return (
    <div className={styles.header}>
      <div className={styles.header__logo}>
        <a href="/">
          <strong>S</strong>ocial<strong>B</strong>ook
        </a>
      </div>
      <div className={styles.header__menu}>
        <ThemeToggle />
        <HeaderNav />
        <HeaderAuth />
      </div>
    </div>
  );
}
