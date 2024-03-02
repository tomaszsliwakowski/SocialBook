import { useMutation, useQuery } from "@apollo/client";
import styles from "../SingleBlogs/blog.module.css";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { FaRegCommentAlt } from "react-icons/fa";
import { GET_LIKES_BLOG } from "../../Query/blogQuery";
import { memo, useEffect, useState } from "react";
import { ADD_LIKE_BLOG, DELETE_LIKE_BLOG } from "../../mutations/blogMutations";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/BlogStore";
import { addLike, addLikesData, deleteLike } from "../../store/BlogSlice";

type PROPS = {
  blogId: string;
  userId: string;
};

export const TopMenuAction = memo(function TopMenuAction({
  blogId,
  userId,
}: PROPS) {
  const state = useSelector((state: RootState) => state.blogData.likesData);
  const dispatch: AppDispatch = useDispatch();
  const { error, data } = useQuery(GET_LIKES_BLOG, {
    variables: { blog_id: blogId, user_id: userId },
  });

  useEffect(() => {
    if (!error && data) {
      if (!data.getBlogLikes) return;
      const { comments_count, liked, likes } = data.getBlogLikes;
      dispatch(
        addLikesData({
          commentsCount: parseInt(comments_count),
          liked: liked,
          likes: parseInt(likes),
        })
      );
    }
  }, [data, blogId]);

  const [addLikeBlog] = useMutation(ADD_LIKE_BLOG, {
    variables: {
      blog_id: blogId,
      user_id: userId,
    },
  });

  const [deleteLikeBlog] = useMutation(DELETE_LIKE_BLOG, {
    variables: {
      blog_id: blogId,
      user_id: userId,
    },
  });
  const handleLikeBlog = async () => {
    await addLikeBlog()
      .then(() => {
        dispatch(addLike());
      })
      .catch((res) => console.log(res));
  };
  const handleDeleteLikeBlog = async () => {
    await deleteLikeBlog()
      .then(() => {
        dispatch(deleteLike());
      })
      .catch((res) => console.log(res));
  };

  return (
    <div className={styles.blog__top__menu__action}>
      <span>
        {state && state.liked ? (
          <AiFillHeart onClick={() => handleDeleteLikeBlog()} />
        ) : (
          <AiOutlineHeart onClick={() => handleLikeBlog()} />
        )}
        <p>{state.likes}</p>
      </span>
      <span>
        <a href="#comments">
          <FaRegCommentAlt />
        </a>
        {state.commentsCount}
      </span>
    </div>
  );
});
