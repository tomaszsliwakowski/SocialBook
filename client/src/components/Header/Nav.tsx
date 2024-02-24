import { NavLink } from "react-router-dom";
import styles from "./header.module.css";
import {
  BLOGS_ROUTE,
  BLOG_CREATOR_ROUTE,
  HOME_ROUTE,
  LOGIN_ROUTE,
  POSTS_ROUTE,
} from "../../routes";
import { IoCreateOutline } from "react-icons/io5";
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
        {window.location.pathname.split("/")[1] === "blogs" ||
        window.location.pathname.split("/")[1] === "blog" ? (
          <NavLink
            to={BLOG_CREATOR_ROUTE}
            onClick={() => setMobile(false)}
            className={styles.header__nav__creator}
          >
            <IoCreateOutline />
          </NavLink>
        ) : null}
      </div>
      <div className={styles.hamburger}>
        <GiHamburgerMenu onClick={() => setMobile(true)} />
      </div>
    </>
  );
}
