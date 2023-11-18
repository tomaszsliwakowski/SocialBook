import styles from "./posts.module.css";
import Post from "./Post";

export default function Posts() {
  return (
    <div className={styles.posts__content}>
      <ul className={styles.posts__list}>
        <Post />
      </ul>
    </div>
  );
}
