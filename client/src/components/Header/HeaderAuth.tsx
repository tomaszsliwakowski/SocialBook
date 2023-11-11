import { useState } from "react";
import styles from "./header.module.css";
import { BiUser } from "react-icons/bi";
import { Link } from "react-router-dom";
import { LOGIN_ROUTE, REGISTER_ROUTE } from "../../routes";

export default function HeaderAuth() {
  return (
    <div className={styles.header__auth}>
      <span className={styles.user}>
        <BiUser />
      </span>
      <div className={styles.dropDown}>
        <NotLogged />
      </div>
    </div>
  );
}

const NotLogged = () => {
  return (
    <>
      <Link className={styles.authBtn} to={LOGIN_ROUTE}>
        Login
      </Link>
      <Link className={styles.authBtn} to={REGISTER_ROUTE}>
        Register
      </Link>
    </>
  );
};
