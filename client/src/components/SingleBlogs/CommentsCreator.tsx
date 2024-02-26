import styles from "./blog.module.css";

type PROPS = {
  modalStatusHandler: Function;
};

export default function CommentsCreator({ modalStatusHandler }: PROPS) {
  return (
    <div className={styles.blog__comments__creator}>
      <button onClick={() => modalStatusHandler(true)}>Add Comment</button>
    </div>
  );
}
