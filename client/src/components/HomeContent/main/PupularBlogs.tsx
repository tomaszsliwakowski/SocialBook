import { UserType } from "../../../context/Auth";
import Blog from "./Blog";
import styles from "./main.module.css";

type PROPS = {
  User: UserType;
};

export default function PupularBlogs({ User }: PROPS) {
  return (
    <div className={styles.popular}>
      <h2>Popular Blogs</h2>
      <ul className={styles.popular__list}>
        <Blog User={User} />
        <Blog User={User} />
        <Blog User={User} />
        <Blog User={User} />
      </ul>
    </div>
  );
}
