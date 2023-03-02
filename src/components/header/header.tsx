import React, { useState, useEffect } from "react";
import styles from "../../App.module.css";
import { ImBlogger } from "react-icons/im";
import { signOut } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/firebase-config";

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
        <a href="/">
          Experience
          <ImBlogger />
          ook
        </a>
      </div>
      <div>
        {user ? (
          <button onClick={logout}>
            <a href="">Logout</a>
          </button>
        ) : (
          <button>
            <a href="/login">Login</a>
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;
