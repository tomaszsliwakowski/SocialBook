import { useContext } from "react";
import { AuthContext, UserAuth } from "../../context/Auth";
import Blog from "./Blog";
import styles from "./blogs.module.css";

export default function Blogs() {
  const { User }: UserAuth = useContext(AuthContext);
  return (
    <div className={styles.blogs__content}>
      <ul className={styles.blogs__content__list}>
        <Blog User={User} />
        <Blog User={User} />
        <Blog User={User} />
        <Blog User={User} />
        <Blog User={User} />
        <Blog User={User} />
      </ul>
    </div>
  );
}
