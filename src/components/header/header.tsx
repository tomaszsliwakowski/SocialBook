import React, { useState, useEffect } from "react";
import styles from "../../App.module.css";
import { ImBlogger } from "react-icons/im";
import { signOut } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/firebase-config";
import { Link } from "react-router-dom";

const Header = () => {
  const [user, setuser] = useState<string | null | undefined>("");
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setuser(currentUser?.email);
    });
  }, []);

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <div className={styles.Header}>
      <div>
        <a href="/SocialBook/">
          Social
          <ImBlogger />
          ook
        </a>
      </div>
      <div>
        {user ? (
          <button onClick={logout}>
            <Link to="/SocialBook">Logout</Link>
          </button>
        ) : (
          <button>
            <Link to="/SocialBook/login">Login</Link>
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;
