import { useContext, useEffect, useState } from "react";
import Comments from "./Comments";
import CommentsCreator from "./CommentsCreator";
import CommentsHead from "./CommentsHead";
import styles from "./blog.module.css";
import CommentsModal from "./CommentsModal";
import { ThemeContext } from "../../context/ThemeContext";
import { useQuery } from "@apollo/client";
import { GET_COMMENTS_BLOG } from "../../Query/blogQuery";

type PROPS = {
  blog_id: string;
};

export interface CommentType {
  blog_id: string;
  user_id: string;
  com_id: string;
  comment_text: string;
  createdAt: string;
  name: string;
}
export type DeleteCommentType = Pick<
  CommentType,
  "blog_id" | "user_id" | "com_id"
>;

export default function CommentsSection({ blog_id }: PROPS) {
  const { theme } = useContext(ThemeContext);
  const [modalStatus, setModalStatus] = useState<boolean>(false);
  const [comments, setComments] = useState<CommentType[]>([]);

  const { loading, data } = useQuery(GET_COMMENTS_BLOG, {
    variables: { blog_id: blog_id },
  });

  useEffect(() => {
    if (!loading && data) {
      const commentsData = data.getBlogComments;
      if (commentsData.lenght === 0) return;
      setComments(commentsData);
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

  const changeCommentsAfterAdd = (comment: CommentType): void => {
    setComments((prev: CommentType[]) => prev.concat(comment));
  };
  const changeCommentsAfterDelete = (comment: DeleteCommentType): void => {};
  return (
    <>
      <div className={styles.blog__comments} id="comments">
        <div className={styles.blog__comments__container}>
          <CommentsHead />
          <CommentsCreator modalStatusHandler={modalStatusHandler} />
        </div>
        <Comments comments={comments} />
      </div>
      {modalStatus ? (
        <CommentsModal
          closeModalAfterClickOtherSite={closeModalAfterClickOtherSite}
          modalStatusHandler={modalStatusHandler}
          blog_id={blog_id}
          changeCommentsAfterAdd={changeCommentsAfterAdd}
        />
      ) : null}
    </>
  );
}
