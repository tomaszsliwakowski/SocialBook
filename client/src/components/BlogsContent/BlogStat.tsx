import styles from "./blogs.module.css";
import { AiOutlineHeart } from "react-icons/ai";
import { FaRegCommentAlt } from "react-icons/fa";

type PROPS = {
  likes: string;
  comments: string;
};

export default function BlogStat({ likes, comments }: PROPS) {
  return (
    <div className={styles.blogs__content__react}>
      <span>
        <AiOutlineHeart />
        {likes}
      </span>
      <span>
        <FaRegCommentAlt />
        {comments}
      </span>
    </div>
  );
}
