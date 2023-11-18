import Menu from "./Menu";
import Posts from "./Posts";
import styles from "./posts.module.css";

export default function Main() {
  return (
    <div className={styles.posts}>
      <Menu />
      <Posts />
    </div>
  );
}
