import Comments from "./Comments";
import CommentsCreator from "./CommentsCreator";
import CommentsHead from "./CommentsHead";
import styles from "./blog.module.css";

export default function CommentsSection() {
  return (
    <div className={styles.blog__comments} id="comments">
      <div className={styles.blog__comments__container}>
        <CommentsHead />
        <CommentsCreator />
      </div>
      <Comments />
    </div>
  );
}
