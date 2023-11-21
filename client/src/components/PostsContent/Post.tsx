import { BiUser } from "react-icons/bi";
import styles from "./posts.module.css";
import { AiOutlineHeart } from "react-icons/ai";
import { FaRegCommentAlt } from "react-icons/fa";
import { useState } from "react";
import { MdDone } from "react-icons/md";
import { POST_TYPE } from "./Posts";

type PROPS = {
  postData: POST_TYPE;
};

export default function Post({ postData }: PROPS) {
  const [sub, setSub] = useState(false);
  return (
    <li>
      <div className={styles.post__header}>
        <div>
          <BiUser />
          <span>{postData.user.name}</span>
          <span>{postData.data}</span>
        </div>
        {!sub ? (
          <button onClick={() => setSub(true)}>Follow</button>
        ) : (
          <div className={styles.follow} onClick={() => setSub(false)}>
            <MdDone />
          </div>
        )}
      </div>
      <div className={styles.post__content}>
        {postData.content.image !== "" ? (
          <img src={postData.content.image} alt="post" />
        ) : null}

        {postData.content.text !== "" ? <p>{postData.content.text}</p> : null}
      </div>
      <div className={styles.post__action}>
        <span>
          <AiOutlineHeart /> {postData.like}
        </span>
        <span>
          <FaRegCommentAlt /> {postData.comments}
        </span>
      </div>
    </li>
  );
}
