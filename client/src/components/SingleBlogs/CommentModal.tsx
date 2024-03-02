import { SlOptionsVertical } from "react-icons/sl";
import styles from "./blog.module.css";
import { ComStateStatusType } from "../PostsContent/Comments";
import { useMutation } from "@apollo/client";
import { DELETE_COMMENT_BLOG } from "../../mutations/blogMutations";
import { BlogCommentType } from "./CommentsSection";
import { UserType } from "../../context/Auth";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/BlogStore";
import { deleteComment } from "../../store/BlogSlice";

type PROPS = {
  comAction: ComStateStatusType;
  comment: BlogCommentType;
  handleComAction: Function;
  User: UserType;
};

export default function CommentModal({
  comAction,
  comment,
  handleComAction,
  User,
}: PROPS) {
  const dispatch: AppDispatch = useDispatch();
  const [deleteBlogComment] = useMutation(DELETE_COMMENT_BLOG, {
    variables: {
      blog_id: comment.blog_id,
      user_id: User.id,
      com_id: comment.com_id,
    },
  });

  const handleDeleteComment = async () => {
    await deleteBlogComment()
      .then((res) => {
        let { deleteBlogComment }: { deleteBlogComment: BlogCommentType } =
          res.data;
        dispatch(deleteComment(deleteBlogComment.com_id));
        handleComAction("", false);
      })
      .catch((err: Error) => console.log(err));
  };

  return (
    <div
      id="ComModal"
      className={`${
        comAction.active && comAction.comId === comment.com_id
          ? styles.blog__comment__content__modalActive
          : styles.blog__comment__content__modal
      }`}
    >
      <SlOptionsVertical
        id="ComModal"
        onClick={() => handleComAction(comment.com_id)}
      />
      {comAction.active && comAction.comId === comment.com_id ? (
        <div
          className={styles.blog__comment__content__modal__opt}
          id="ComModal"
        >
          <div id="ComModal" onClick={() => handleDeleteComment()}>
            Delete
          </div>
        </div>
      ) : null}
    </div>
  );
}
