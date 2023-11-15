import { NavLink } from "react-router-dom";
import styles from "./header.module.css";
import {
  BLOGS_ROUTE,
  CHATS_ROUTE,
  HOME_ROUTE,
  LOGIN_ROUTE,
  POSTS_ROUTE,
} from "../../routes";
import { GiHamburgerMenu } from "react-icons/gi";
import { useContext, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { AuthContext, UserAuth } from "../../context/Auth";

const activeStyle = {
  color: "#3a86ff",
};

export default function HeaderNav() {
  const [mobile, setMobile] = useState(false);
  const { User }: UserAuth = useContext(AuthContext);
  return (
    <>
      <div
        className={
          mobile ? `${styles.header__nav__mobile}` : `${styles.header__nav}`
        }
      >
        {mobile ? (
          <div className={styles.hamburger__close}>
            <AiOutlineClose onClick={() => setMobile(false)} />
          </div>
        ) : null}
        <NavLink
          to={HOME_ROUTE}
          style={({ isActive }) => (isActive ? activeStyle : {})}
          onClick={() => setMobile(false)}
        >
          Start
        </NavLink>
        <NavLink
          to={User.email !== "" ? POSTS_ROUTE : LOGIN_ROUTE}
          style={({ isActive }) => (isActive ? activeStyle : {})}
          onClick={() => setMobile(false)}
        >
          Posts
        </NavLink>
        <NavLink
          to={User.email !== "" ? BLOGS_ROUTE : LOGIN_ROUTE}
          style={({ isActive }) => (isActive ? activeStyle : {})}
          onClick={() => setMobile(false)}
        >
          Blogs
        </NavLink>
        <NavLink
          to={User.email !== "" ? CHATS_ROUTE : LOGIN_ROUTE}
          style={({ isActive }) => (isActive ? activeStyle : {})}
          onClick={() => setMobile(false)}
        >
          Chats
        </NavLink>
      </div>
      <div className={styles.hamburger}>
        <GiHamburgerMenu onClick={() => setMobile(true)} />
      </div>
    </>
  );
}
