import { useContext, useState } from "react";
import CommentsModalContent from "./CommentsModalContent";
import CommentsModalHeader from "./CommentsModalHeader";
import styles from "./blog.module.css";
import CommentsModalAction from "./CommentsModalAction";
import { ADD_COMMENT_BLOG } from "../../mutations/blogMutations";
import { useMutation } from "@apollo/client";
import { v4 as uuidv4 } from "uuid";
import { AuthContext, UserAuth } from "../../context/Auth";
import { BlogCommentType } from "./CommentsSection";
import { AppDispatch } from "../../store/BlogStore";
import { useDispatch } from "react-redux";
import { addComment } from "../../store/BlogSlice";

type PROPS = {
  closeModalAfterClickOtherSite: Function;
  modalStatusHandler: Function;
  blog_id: string;
};

type AddCommentType = Pick<
  BlogCommentType,
  "blog_id" | "user_id" | "com_id" | "comment_text"
>;

export default function CommentsModal({
  closeModalAfterClickOtherSite,
  modalStatusHandler,
  blog_id,
}: PROPS) {
  const { User }: UserAuth = useContext(AuthContext);
  const dispatch: AppDispatch = useDispatch();
  const [commentText, setCommentText] = useState<string>("");

  const handleCommentText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCommentText(e.target.value);
  };

  const [addBlogComment] = useMutation(ADD_COMMENT_BLOG, {
    variables: {
      blog_id: blog_id,
      user_id: User.id,
      comment_text: commentText,
      com_id: uuidv4(),
    },
  });

  const shareComment = async () => {
    if (commentText === "") return;
    await addBlogComment()
      .then((res) => {
        let { addBlogComment }: { addBlogComment: AddCommentType } = res.data;
        const Comment = Object.assign(addBlogComment, {
          createdAt: new Date().getTime().toString(),
          name: User.name,
        });
        dispatch(addComment(Comment));
        setCommentText("");
        modalStatusHandler(false);
      })
      .catch((res) => console.log(res));
  };

  return (
    <div
      id="modal"
      onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
        closeModalAfterClickOtherSite(e)
      }
      className={styles.blog__comments__modal}
    >
      <div className={styles.blog__comments__modal__body}>
        <CommentsModalHeader modalStatusHandler={modalStatusHandler} />
        <CommentsModalContent
          commentText={commentText}
          handleCommentText={handleCommentText}
        />
        <CommentsModalAction
          shareDisable={commentText === ""}
          shareComment={shareComment}
        />
      </div>
    </div>
  );
}
