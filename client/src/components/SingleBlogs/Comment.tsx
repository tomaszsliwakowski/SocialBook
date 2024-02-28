import { BiUser } from "react-icons/bi";
import styles from "./blog.module.css";
import { timeExpiredFrom } from "../../assets/assets";
import { SlOptionsVertical } from "react-icons/sl";
import { CommentType } from "./CommentsSection";

type PROPS = {
  comment: CommentType;
};

export default function Comment({ comment }: PROPS) {
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
            <div className={styles.blog__comment__content__modal}>
              <SlOptionsVertical />
            </div>
          </div>
        </div>
        <p>{comment.comment_text}</p>
      </div>
    </li>
  );
}
