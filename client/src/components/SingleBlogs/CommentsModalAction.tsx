import styles from "./blog.module.css";

type PROPS = {
  shareDisable: boolean;
  shareComment: Function;
};

export default function CommentsModalAction({
  shareComment,
  shareDisable,
}: PROPS) {
  return (
    <div className={styles.blog__comments__modal__body__action}>
      <button disabled={shareDisable} onClick={() => shareComment()}>
        Share Comment
      </button>
    </div>
  );
}
