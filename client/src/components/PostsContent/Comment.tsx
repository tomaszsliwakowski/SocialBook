import { BiUser } from "react-icons/bi";
import styles from "./posts.module.css";
import { ComStateStatusType, CommentType } from "./Comments";
import { timeExpiredFrom } from "../../assets/assets";
import CommentModal from "./CommentModal";

type PROPS = {
  comment: CommentType;
  handleComAction: Function;
  handelDeleteComment: Function;
  comAction: ComStateStatusType;
};
export default function Comment({
  handleComAction,
  handelDeleteComment,
  comAction,
  comment,
}: PROPS) {
  return (
    <div className={styles.comment}>
      <div className={styles.comment_user}>
        <BiUser />
      </div>
      <div className={styles.comment__container}>
        <div className={styles.comment__header}>
          <span>{comment.username}</span>
          <div className={styles.comment__header__sec}>
            <span>{timeExpiredFrom(comment.createdAt)}</span>
            <CommentModal
              handelDeleteComment={handelDeleteComment}
              handleComAction={handleComAction}
              comAction={comAction}
              comment={comment}
            />
          </div>
        </div>
        <p>{comment.comment_text}</p>
      </div>
    </div>
  );
}
