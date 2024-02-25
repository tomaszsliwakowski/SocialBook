import styles from "./blog.module.css";

export default function CommentsCreator() {
  return (
    <div className={styles.blog__comments__creator}>
      <button>Add Comment</button>
    </div>
  );
}
