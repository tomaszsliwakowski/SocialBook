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
import { useMutation, useQuery } from "@apollo/client";
import {
  ADD_FOLLOW,
  ADD_LIKE_POST,
  DELETE_FOLLOW,
  DELETE_LIKE_POST,
  DELETE_POST,
} from "../../mutations/postsMutations";
import Comments from "./Comments";
import {
  followCheck,
  handleAddFollow,
  handleDeleteFollow,
  timeExpiredFrom,
} from "../../assets/assets";

type PROPS = {
  postData: PostType;
  User: UserType;
  setPostsData: React.Dispatch<React.SetStateAction<PostType[]>>;
  refetchUser: Function;
};
export type StateStatusType = {
  postId: string;
  active: boolean;
};

export default function Post({
  postData,
  User,
  setPostsData,
  refetchUser,
}: PROPS) {
  const [sub, setSub] = useState<StateStatusType>({
    postId: postData.post_id,
    active: followCheck(User.followers, postData.user_id),
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
  });
  const [addFollow] = useMutation(ADD_FOLLOW, {
    variables: {
      user_id: User.id,
      follower_id: postData.user_id,
    },
  });
  const [deleteFollow] = useMutation(DELETE_FOLLOW, {
    variables: {
      user_id: User.id,
      follower_id: postData.user_id,
    },
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

  useEffect(() => {
    setSub((prev) => ({
      ...prev,
      active: followCheck(User.followers, postData.user_id),
    }));
  }, [User.followers, postData]);

  const handleDeletePost = async () => {
    await deletePost()
      .then((res) => {
        let { deletePost }: { deletePost: { post_id: string } } = res.data;
        setPostsData((prev) =>
          prev.filter((item) => item.post_id !== deletePost.post_id)
        );
        setPostAction((prev) => ({ ...prev, active: false }));
      })
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
              <div className={styles.post__header__user}>
                <BiUser className={styles.post__header__userIcon} />
                <span>{postData.user_name}</span>
                {User.id !== postData.user_id ? (
                  sub.active ? (
                    <div
                      className={styles.follow}
                      onClick={() =>
                        setSub((prev) => ({ ...prev, active: false }))
                      }
                    >
                      <MdDone
                        onClick={() =>
                          handleDeleteFollow(deleteFollow, refetchUser)
                        }
                      />
                    </div>
                  ) : (
                    <button
                      onClick={() => handleAddFollow(addFollow, refetchUser)}
                    >
                      Follow
                    </button>
                  )
                ) : null}
              </div>
              <span className={styles.post__header__time}>
                {timeExpiredFrom(postData.createdAt)}
              </span>
            </div>
            {User.id === postData.user_id ? (
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
            ) : null}
          </div>
          <div className={styles.post__content}>
            {postData.post_img !== "" ? (
              <img src={postData.post_img} alt="post" />
            ) : null}

            {postData.post_text !== "" ? <p>{postData.post_text}</p> : null}
          </div>
          <div className={styles.post__action}>
            <span>
              {data.getLikes.liked ? (
                <AiFillHeart onClick={() => handleDeleteLikePost()} />
              ) : (
                <AiOutlineHeart onClick={() => handleLikePost()} />
              )}
              {data.getLikes.likes}
            </span>
            <span
              onClick={() =>
                setCommentsStatus((prev) => ({ ...prev, active: !prev.active }))
              }
            >
              <FaRegCommentAlt /> {data.getLikes.comments_count}
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
