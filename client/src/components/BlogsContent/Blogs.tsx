import Blog from "./Blog";
import styles from "./blogs.module.css";

export default function Blogs() {
  return (
    <div className={styles.blogs__content}>
      <ul className={styles.blogs__content__list}>
        <Blog />
        <Blog />
        <Blog />
        <Blog />
        <Blog />
        <Blog />
      </ul>
    </div>
  );
}
