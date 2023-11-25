import styles from "./posts.module.css";
import Post from "./Post";
import { POST_TYPE } from "./Main";
import { UserType } from "../../context/Auth";

type PROPS = {
  postsData: POST_TYPE[];
  User: UserType;
};

export default function Posts({ postsData, User }: PROPS) {
  return (
    <div className={styles.posts__content}>
      <ul className={styles.posts__list}>
        {postsData.map((item, id) => (
          <Post key={id} postData={item} User={User} />
        ))}
      </ul>
    </div>
  );
}
