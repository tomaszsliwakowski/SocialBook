import { BiUser } from "react-icons/bi";
import styles from "./posts.module.css";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

import { FaRegCommentAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
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

  useEffect(() => {
    if (!postAction.active) return;
    const parent = document.querySelector("body");

    function closeModal(e: Event) {
      let target = e.target as HTMLElement;
      if (target.id !== "modal") {
        setPostAction((prev) => ({ active: false, postId: prev.postId }));
      }
    }

    if (parent) {
      parent.addEventListener("click", closeModal);
    }
    return () => {
      if (parent) {
        parent.removeEventListener("click", closeModal);
      }
    };
  }, [postAction.active]);

  return (
    <li>
      <div className={styles.post__header}>
        <div className={styles.post__header__info}>
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
          <div className={styles.postSet} id="modal">
            <SlOptionsVertical
              id="modal"
              onClick={() =>
                setPostAction((prev) => ({
                  active: !prev.active,
                  postId: prev.postId,
                }))
              }
            />
            {postAction.active ? (
              <div className={styles.postSet__opt} id="modal">
                <div id="modal">Delete</div>
              </div>
            ) : null}
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
          {postData.like.includes(User.id) ? (
            <AiFillHeart />
          ) : (
            <AiOutlineHeart />
          )}
          {postData.like.length}
        </span>
        <span>
          <FaRegCommentAlt /> {postData.comments}
        </span>
      </div>
    </li>
  );
}
