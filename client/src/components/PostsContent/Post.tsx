import { useEffect, useState } from "react";
import { UserType } from "../../context/Auth";
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
import { followCheck } from "../../assets/assets";
import PostHeader from "./PostHeader";
import PostContent from "./PostContent";
import PostAction from "./PostAction";

type PROPS = {
  postData: PostType;
  User: UserType;
  setPostsData: React.Dispatch<React.SetStateAction<PostType[]>>;
  refetchUser: Function;
};
export type PostStateStatusType = {
  postId: string;
  active: boolean;
};

export type LikesStateType = {
  comments_count: string;
  liked: boolean;
  likes: string;
};

export default function Post({
  postData,
  User,
  setPostsData,
  refetchUser,
}: PROPS) {
  const [sub, setSub] = useState<PostStateStatusType>({
    postId: postData.post_id,
    active: followCheck(User.followers, postData.user_id),
  });
  const [postAction, setPostAction] = useState<PostStateStatusType>({
    postId: postData.post_id,
    active: false,
  });
  const [commentsStatus, setCommentsStatus] = useState<PostStateStatusType>({
    postId: postData.post_id,
    active: false,
  });
  const [likes, setLikes] = useState<LikesStateType | null>(null);

  const { error, data, refetch } = useQuery(GET_LIKES, {
    variables: { post_id: postData.post_id, user_id: User.id },
  });

  useEffect(() => {
    if (!error && data) {
      if (!data.getLikes) return;
      setLikes(data.getLikes);
    }
  }, [data]);

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

  const handleStatusSubChange = (action: boolean) => {
    setSub((prev) => ({ ...prev, active: action }));
  };
  const actionPostOff = () => {
    setPostAction((prev) => ({
      active: !prev.active,
      postId: prev.postId,
    }));
  };

  const handleCommentsStatus = () => {
    setCommentsStatus((prev) => ({ ...prev, active: !prev.active }));
  };

  return (
    <>
      {!error && data ? (
        <li>
          <PostHeader
            handleDeletePost={handleDeletePost}
            handleStatusSubChange={handleStatusSubChange}
            actionPostOff={actionPostOff}
            postAction={postAction}
            User={User}
            sub={sub}
            postData={postData}
            refetchUser={refetchUser}
            addFollow={addFollow}
            deleteFollow={deleteFollow}
          />
          <PostContent postData={postData} />
          <PostAction
            likes={likes}
            handleLikePost={handleLikePost}
            handleDeleteLikePost={handleDeleteLikePost}
            handleCommentsStatus={handleCommentsStatus}
          />
          {commentsStatus.active ? (
            <Comments postData={postData} User={User} refetch={refetch} />
          ) : null}
        </li>
      ) : null}
    </>
  );
}
