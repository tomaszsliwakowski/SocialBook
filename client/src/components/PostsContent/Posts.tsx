import styles from "./posts.module.css";
import Post from "./Post";
import { PostType } from "./Main";
import { UserType } from "../../context/Auth";

type PROPS = {
  postsData: PostType[];
  User: UserType;
};

export default function Posts({ postsData, User }: PROPS) {
  return (
    <div className={styles.posts__content}>
      <ul className={styles.posts__list}>
        {postsData.length > 0
          ? postsData.map((item, id) => (
              <Post key={id} postData={item} User={User} />
            ))
          : null}
      </ul>
    </div>
  );
}
