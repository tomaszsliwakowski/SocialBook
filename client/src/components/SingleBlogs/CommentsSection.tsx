import { useContext, useEffect, useState } from "react";
import Comments from "./Comments";
import CommentsCreator from "./CommentsCreator";
import CommentsHead from "./CommentsHead";
import styles from "./blog.module.css";
import CommentsModal from "./CommentsModal";
import { ThemeContext } from "../../context/ThemeContext";
import { useQuery } from "@apollo/client";
import { GET_COMMENTS_BLOG } from "../../Query/blogQuery";
import { AppDispatch, RootState } from "../../store/BlogStore";
import { useDispatch, useSelector } from "react-redux";
import { addComments } from "../../store/BlogSlice";
import { AuthContext, UserAuth } from "../../context/Auth";

type PROPS = {
  blog_id: string;
};

export interface BlogCommentType {
  blog_id: string;
  user_id: string;
  com_id: string;
  comment_text: string;
  createdAt: string;
  name: string;
}
export type DeleteCommentType = Pick<
  BlogCommentType,
  "blog_id" | "user_id" | "com_id"
>;

export default function CommentsSection({ blog_id }: PROPS) {
  const { theme } = useContext(ThemeContext);
  const [modalStatus, setModalStatus] = useState<boolean>(false);
  const { User }: UserAuth = useContext(AuthContext);
  const comments = useSelector((state: RootState) => state.blogData.comments);
  const dispatch: AppDispatch = useDispatch();

  const { loading, data } = useQuery(GET_COMMENTS_BLOG, {
    variables: { blog_id: blog_id },
  });

  useEffect(() => {
    if (!loading && data) {
      const commentsData = data.getBlogComments;
      if (commentsData.lenght === 0) return;
      dispatch(addComments(commentsData));
    }
  }, [data]);

  useEffect(() => {
    if (!modalStatus) return;
    const parent = document.querySelector("body");
    if (parent) {
      parent.classList.add("scrollOff" + theme);
    }
    return () => {
      if (parent) {
        parent.classList.remove("scrollOff" + theme);
      }
    };
  }, [modalStatus]);

  const closeModalAfterClickOtherSite = (e: React.MouseEvent): void => {
    let target = e.target as HTMLElement;
    if (target.id === "modal") {
      setModalStatus(false);
    }
  };
  const modalStatusHandler = (action: boolean): void => {
    setModalStatus(action);
  };

  return (
    <>
      <div className={styles.blog__comments} id="comments">
        <div className={styles.blog__comments__container}>
          <CommentsHead />
          <CommentsCreator modalStatusHandler={modalStatusHandler} />
        </div>
        <Comments User={User} comments={comments} />
      </div>
      {modalStatus ? (
        <CommentsModal
          closeModalAfterClickOtherSite={closeModalAfterClickOtherSite}
          modalStatusHandler={modalStatusHandler}
          blog_id={blog_id}
        />
      ) : null}
    </>
  );
}
