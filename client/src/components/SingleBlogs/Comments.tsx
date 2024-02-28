import styles from "./blog.module.css";
import Comment from "./Comment";
import { CommentType } from "./CommentsSection";

type PROPS = {
  comments: CommentType[];
};

export default function Comments({ comments }: PROPS) {
  console.log(comments);
  return (
    <div className={styles.blog__comments__content}>
      {comments.length !== 0 ? (
        <ul>
          {comments.map((item, id) => (
            <Comment key={id} comment={item} />
          ))}
        </ul>
      ) : (
        <div className={styles.blog__comments__empty}>
          There are no comments
        </div>
      )}
    </div>
  );
}
