import styles from "./posts.module.css";

type PROPS = {
  shareDisable: boolean;
  sharePost: Function;
};

export default function AddPostAction({ shareDisable, sharePost }: PROPS) {
  return (
    <div className={styles.addPost__action}>
      <button disabled={shareDisable} onClick={() => sharePost()}>
        Share Post
      </button>
    </div>
  );
}
