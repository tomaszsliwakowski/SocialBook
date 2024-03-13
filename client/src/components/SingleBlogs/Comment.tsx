import { BiUser } from "react-icons/bi";
import styles from "./blog.module.css";
import { timeExpiredFrom } from "../../assets/assets";
import { BlogCommentType } from "./CommentsSection";
import CommentModal from "./CommentModal";
import { UserType } from "../../context/Auth";
import { ComStateStatusType } from "../PostsContent/Comments";

type PROPS = {
  comment: BlogCommentType;
  User: UserType;
  comAction: ComStateStatusType;
  handleComAction: Function;
};

export default function Comment({
  comment,
  User,
  comAction,
  handleComAction,
}: PROPS) {
  return (
    <li className={styles.blog__comment}>
      <div className={styles.blog__comment__user}>
        <BiUser />
      </div>
      <div className={styles.blog__comment__content}>
        <div className={styles.blog__comment__contentHead}>
          <span className={styles.blog__comment__userName}>{comment.name}</span>
          <div className={styles.blog__comment__contentHead__con}>
            <span>{timeExpiredFrom(comment.createdAt)}</span>
            {User.id === comment.user_id ? (
              <CommentModal
                comAction={comAction}
                comment={comment}
                handleComAction={handleComAction}
                User={User}
              />
            ) : null}
          </div>
        </div>
        <p>{comment.comment_text}</p>
      </div>
    </li>
  );
}
