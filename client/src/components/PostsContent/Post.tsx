import { BiUser } from "react-icons/bi";
import styles from "./posts.module.css";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { FaRegCommentAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import { MdDone } from "react-icons/md";
import { UserType } from "../../context/Auth";
import { SlOptionsVertical } from "react-icons/sl";
import { PostType } from "./Main";
import { GET_LIKES, GET_POSTS } from "../../Query/postsQuery";
import { useMutation, useQuery } from "@apollo/client";
import {
  ADD_LIKE_POST,
  DELETE_LIKE_POST,
  DELETE_POST,
} from "../../mutations/postsMutations";
import Comments from "./Comments";
import { timeExpiredFrom } from "../../assets/assets";

type PROPS = {
  postData: PostType;
  User: UserType;
  postsType: string;
  pageCount: string;
};
type StateStatusType = {
  postId: string;
  active: boolean;
};

export default function Post({ postData, User, postsType, pageCount }: PROPS) {
  const [sub, setSub] = useState<StateStatusType>({
    postId: postData.post_id,
    active: false,
  });
  const [postAction, setPostAction] = useState<StateStatusType>({
    postId: postData.post_id,
    active: false,
  });
  const [commentsStatus, setCommentsStatus] = useState<StateStatusType>({
    postId: postData.post_id,
    active: false,
  });

  const { error, data, refetch } = useQuery(GET_LIKES, {
    variables: { post_id: postData.post_id, user_id: User.id },
  });

  const [deletePost] = useMutation(DELETE_POST, {
    variables: {
      post_id: postData.post_id,
    },
    refetchQueries: [
      {
        query: GET_POSTS,
        variables: { type: postsType, user_id: User.id, count: pageCount },
      },
    ],
  });

  const [addLikePost] = useMutation(ADD_LIKE_POST, {
    variables: {
      post_id: postData.post_id,
      user_id: User.id,
    },
    refetchQueries: [
      {
        query: GET_LIKES,
        variables: { post_id: postData.post_id, user_id: User.id },
      },
    ],
  });
  const [deleteLikePost] = useMutation(DELETE_LIKE_POST, {
    variables: {
      post_id: postData.post_id,
      user_id: User.id,
    },
    refetchQueries: [
      {
        query: GET_LIKES,
        variables: { post_id: postData.post_id, user_id: User.id },
      },
    ],
  });

  const handleDeletePost = async () => {
    await deletePost()
      .then(() => setPostAction((prev) => ({ ...prev, active: false })))
      .catch((res) => console.log(res));
  };
  const handleLikePost = async () => {
    await addLikePost().catch((res) => console.log(res));
  };
  const handleDeleteLikePost = async () => {
    await deleteLikePost().catch((res) => console.log(res));
  };

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
      {!error && data ? (
        <li>
          <div className={styles.post__header}>
            <div className={styles.post__header__info}>
              <BiUser />
              <span>{postData.user_name}</span>
              <span>{timeExpiredFrom(postData.createdAt)}</span>
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
                    <div id="modal" onClick={() => handleDeletePost()}>
                      Delete
                    </div>
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
              {data.GetLikes.liked ? (
                <AiFillHeart onClick={() => handleDeleteLikePost()} />
              ) : (
                <AiOutlineHeart onClick={() => handleLikePost()} />
              )}
              {data.GetLikes.likes}
            </span>
            <span
              onClick={() =>
                setCommentsStatus((prev) => ({ ...prev, active: !prev.active }))
              }
            >
              <FaRegCommentAlt /> {data.GetLikes.comments_count}
            </span>
          </div>
          {commentsStatus.active ? (
            <Comments postData={postData} User={User} refetch={refetch} />
          ) : null}
        </li>
      ) : null}
    </>
  );
}
