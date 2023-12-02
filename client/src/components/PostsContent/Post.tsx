import { BiUser } from "react-icons/bi";
import styles from "./posts.module.css";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

import { FaRegCommentAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import { MdDone } from "react-icons/md";
import { UserType } from "../../context/Auth";
import { SlOptionsVertical } from "react-icons/sl";
import { PostType } from "./Main";
import { GET_LIKES } from "../../Query/postsQuery";
import { useQuery } from "@apollo/client";

type PROPS = {
  postData: PostType;
  User: UserType;
};

export default function Post({ postData, User }: PROPS) {
  const [sub, setSub] = useState({
    postId: postData.post_id,
    active: false,
  });
  const [postAction, setPostAction] = useState({
    postId: postData.post_id,
    active: false,
  });

  const { loading, error, data, refetch } = useQuery(GET_LIKES, {
    variables: { post_id: postData.post_id, user_id: User.id },
  });

  useEffect(() => {
    console.log(data);
  }, [data]);

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
    <>
      {!error ? (
        <li>
          <div className={styles.post__header}>
            <div className={styles.post__header__info}>
              <BiUser />
              <span>{postData.user_name}</span>
              <span>{`${new Date(
                parseInt(postData.createdAt)
              ).toLocaleString()}`}</span>
            </div>
            {User.id !== postData.user_id ? (
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
            {postData.post_img !== "" ? (
              <img src={postData.post_img} alt="post" />
            ) : null}

            {postData.post_text !== "" ? <p>{postData.post_text}</p> : null}
          </div>
          <div className={styles.post__action}>
            <span>
              {data.GetLikes.liked ? <AiFillHeart /> : <AiOutlineHeart />}
              {data.GetLikes.likes}
            </span>
            <span>
              <FaRegCommentAlt /> {data.GetLikes.comments_count}
            </span>
          </div>
        </li>
      ) : null}
    </>
  );
}
