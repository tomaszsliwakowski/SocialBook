import Blog from "./Blog";
import styles from "./main.module.css";

export default function PupularBlogs() {
  return (
    <div className={styles.popular}>
      <h2>Popular Blogs</h2>
      <ul className={styles.popular__list}>
        <Blog />
        <Blog />
        <Blog />
        <Blog />
      </ul>
    </div>
  );
}
