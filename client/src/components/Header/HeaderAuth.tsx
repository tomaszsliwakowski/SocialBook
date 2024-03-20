import styles from "./header.module.css";
import { BiUser } from "react-icons/bi";
import { Link } from "react-router-dom";
import { LOGIN_ROUTE, REGISTER_ROUTE } from "../../routes";
import { AuthContext, UserAuth } from "../../context/Auth";
import { useContext } from "react";
import { deleteCookie } from "../../assets/assets";
import { DOMAIN } from "../../assets/Library";

export default function HeaderAuth() {
  const { User, refetchUser }: UserAuth = useContext(AuthContext);

  return (
    <div className={styles.header__auth}>
      <span className={styles.user}>
        <BiUser />
      </span>
      <div className={styles.dropDown}>
        {User.id === "" || !User.id ? (
          <NotLogged />
        ) : (
          <Logged refetch={refetchUser} />
        )}
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
      <Link className={styles.SetBtn} to={"/SocialBook"}>
        Profile
      </Link>
      <Link className={styles.SetBtn} to={"/SocialBook"}>
        Saved
      </Link>
      <Link className={styles.SetBtn} to={"/SocialBook"}>
        Settings
      </Link>
      <button className={styles.authBtn} onClick={() => logOut()}>
        Logout
      </button>
    </>
  );
};
