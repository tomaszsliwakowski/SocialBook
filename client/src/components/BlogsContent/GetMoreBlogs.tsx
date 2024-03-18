import styles from "./blogs.module.css";

type PROPS = {
  maxBlogs: boolean;
  getMorePosts: Function;
};

export default function GetMoreBlogs({ maxBlogs, getMorePosts }: PROPS) {
  return (
    <div className={styles.blogs__getMore}>
      <button
        disabled={maxBlogs}
        className={styles.blogs__loadingMore}
        onClick={() => getMorePosts()}
      >
        {maxBlogs ? "End of blogs" : "Show more"}
      </button>
    </div>
  );
}
