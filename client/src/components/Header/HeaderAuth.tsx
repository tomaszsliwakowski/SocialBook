import styles from "./header.module.css";
import { BiUser } from "react-icons/bi";
import { Link } from "react-router-dom";
import { LOGIN_ROUTE, REGISTER_ROUTE } from "../../routes";
import { AuthContext, UserAuth } from "../../context/Auth";
import { useContext } from "react";
import { DOMAIN, deleteCookie } from "../../assets/assets";

export default function HeaderAuth() {
  const { User, refetch }: UserAuth = useContext(AuthContext);
  return (
    <div className={styles.header__auth}>
      <span className={styles.user}>
        <BiUser />
      </span>
      <div className={styles.dropDown}>
        {User.email === "" ? <NotLogged /> : <Logged refetch={refetch} />}
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

const Logged = ({ refetch }: { refetch: Function }) => {
  function logOut() {
    deleteCookie("IdUser", "/", DOMAIN);
    refetch();
  }

  return (
    <>
      <Link className={styles.SetBtn} to={"/"}>
        Settings
      </Link>
      <Link className={styles.SetBtn} to={"/"}>
        Saved
      </Link>
      <button className={styles.authBtn} onClick={() => logOut()}>
        Logout
      </button>
    </>
  );
};
