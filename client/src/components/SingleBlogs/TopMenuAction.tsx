import { useMutation, useQuery } from "@apollo/client";
import styles from "../SingleBlogs/blog.module.css";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { FaRegCommentAlt } from "react-icons/fa";
import { GET_LIKES_BLOG } from "../../Query/blogQuery";
import { memo, useEffect, useState } from "react";
import { ADD_LIKE_BLOG, DELETE_LIKE_BLOG } from "../../mutations/blogMutations";

type PROPS = {
  blogId: string;
  userId: string;
};

type StateType = {
  comments_count: string;
  liked: boolean;
  likes: string;
};

export const TopMenuAction = memo(function TopMenuAction({
  blogId,
  userId,
}: PROPS) {
  const [state, setState] = useState<StateType | null>(null);
  const { error, data } = useQuery(GET_LIKES_BLOG, {
    variables: { blog_id: blogId, user_id: userId },
  });

  useEffect(() => {
    if (!error && data) {
      if (!data.getBlogLikes) return;
      setState(data.getBlogLikes);
    }
  }, [data, blogId]);

  const [addLikeBlog] = useMutation(ADD_LIKE_BLOG, {
    variables: {
      blog_id: blogId,
      user_id: userId,
    },
    refetchQueries: [
      {
        query: GET_LIKES_BLOG,
        variables: { blog_id: blogId, user_id: userId },
      },
    ],
  });

  const [deleteLikeBlog] = useMutation(DELETE_LIKE_BLOG, {
    variables: {
      blog_id: blogId,
      user_id: userId,
    },
    refetchQueries: [
      {
        query: GET_LIKES_BLOG,
        variables: { blog_id: blogId, user_id: userId },
      },
    ],
  });
  const handleLikeBlog = async () => {
    await addLikeBlog().catch((res) => console.log(res));
  };
  const handleDeleteLikeBlog = async () => {
    await deleteLikeBlog().catch((res) => console.log(res));
  };

  return (
    <div className={styles.blog__top__menu__action}>
      <span>
        {state && state.liked ? (
          <AiFillHeart onClick={() => handleDeleteLikeBlog()} />
        ) : (
          <AiOutlineHeart onClick={() => handleLikeBlog()} />
        )}
        <p>{state?.likes}</p>
      </span>
      <span>
        <a href="#comments">
          <FaRegCommentAlt />
        </a>
        {state?.comments_count}
      </span>
    </div>
  );
});
