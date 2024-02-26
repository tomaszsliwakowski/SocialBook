import styles from "./blog.module.css";

type PROPS = {
  commentText: string;
  handleCommentText: Function;
};

export default function CommentsModalContent({
  commentText,
  handleCommentText,
}: PROPS) {
  return (
    <div className={styles.blog__comments__modal__body__content}>
      <textarea
        value={commentText}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
          handleCommentText(e)
        }
        placeholder="What are you thinking about?"
      />
    </div>
  );
}
