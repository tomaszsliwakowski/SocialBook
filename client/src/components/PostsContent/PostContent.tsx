import { PostType } from "./Main";
import styles from "./posts.module.css";

type PROPS = {
  postData: PostType;
};

export default function PostContent({ postData }: PROPS) {
  return (
    <div className={styles.post__content}>
      {postData.post_img !== "" ? (
        <img src={postData.post_img} alt="post" />
      ) : null}

      {postData.post_text !== "" ? <p>{postData.post_text}</p> : null}
    </div>
  );
}
