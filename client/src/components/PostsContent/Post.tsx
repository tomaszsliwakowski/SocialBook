import { BiUser } from "react-icons/bi";
import styles from "./posts.module.css";
import { AiOutlineHeart } from "react-icons/ai";
import { FaRegCommentAlt } from "react-icons/fa";
import { useState } from "react";
import { MdDone } from "react-icons/md";
import { UserType } from "../../context/Auth";
import { POST_TYPE } from "./Main";
import { SlOptionsVertical } from "react-icons/sl";

type PROPS = {
  postData: POST_TYPE;
  User: UserType;
};

export default function Post({ postData, User }: PROPS) {
  const [sub, setSub] = useState({
    postId: postData.id,
    active: false,
  });
  const [postAction, setPostAction] = useState({
    postId: postData.id,
    active: false,
  });
  return (
    <li>
      <div className={styles.post__header}>
        <div>
          <BiUser />
          <span>{postData.user.name}</span>
          <span>{postData.data}</span>
        </div>
        {User.id !== postData.user.id ? (
          !sub.active ? (
            <button
              onClick={() => setSub((prev) => ({ ...prev, active: true }))}
            >
              Follow
            </button>
          ) : (
            <div
              className={styles.follow}
              onClick={() => setSub((prev) => ({ ...prev, active: false }))}
            >
              <MdDone />
            </div>
          )
        ) : (
          <div className={styles.postSet}>
            <SlOptionsVertical />
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
