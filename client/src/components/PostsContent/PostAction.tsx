import { FaRegCommentAlt } from "react-icons/fa";
import styles from "./posts.module.css";
import { LikesStateType } from "./Post";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

type PROPS = {
  likes: LikesStateType | null;
  handleDeleteLikePost: Function;
  handleLikePost: Function;
  handleCommentsStatus: Function;
};

export default function PostAction({
  likes,
  handleDeleteLikePost,
  handleLikePost,
  handleCommentsStatus,
}: PROPS) {
  return (
    <div className={styles.post__action}>
      <span>
        {likes?.liked ? (
          <AiFillHeart onClick={() => handleDeleteLikePost()} />
        ) : (
          <AiOutlineHeart onClick={() => handleLikePost()} />
        )}
        {likes?.likes}
      </span>
      <span onClick={() => handleCommentsStatus()}>
        <FaRegCommentAlt /> {likes?.comments_count}
      </span>
    </div>
  );
}
