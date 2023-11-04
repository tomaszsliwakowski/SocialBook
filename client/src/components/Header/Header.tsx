import { NavLink } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import styles from "./header.module.css";
import { BiUser } from "react-icons/bi";

const activeStyle = {
  color: "#3a86ff",
};

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
        <div className={styles.header__nav}>
          <NavLink
            to={"/"}
            style={({ isActive }) => (isActive ? activeStyle : {})}
          >
            Start
          </NavLink>
          <NavLink
            to={"/posts"}
            style={({ isActive }) => (isActive ? activeStyle : {})}
          >
            Posts
          </NavLink>
          <NavLink
            to={"/blogs"}
            style={({ isActive }) => (isActive ? activeStyle : {})}
          >
            Blogs
          </NavLink>
          <NavLink
            to={"/chats"}
            style={({ isActive }) => (isActive ? activeStyle : {})}
          >
            Chats
          </NavLink>
        </div>
        <div className={styles.header__auth}>
          <span>
            <BiUser />
          </span>
        </div>
      </div>
    </div>
  );
}
