import styles from "./blog.module.css";

export default function CommentsHead() {
  return (
    <div className={styles.blog__comments__head}>
      <h2>Comments</h2>
      <span>Share your opnion</span>
    </div>
  );
}
