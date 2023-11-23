import styles from "./posts.module.css";
import Post from "./Post";
import { POST_TYPE } from "./Main";
import { AuthContext, UserAuth } from "../../context/Auth";
import { useContext } from "react";

type PROPS = {
  postsData: POST_TYPE[];
};

export default function Posts({ postsData }: PROPS) {
  const { User }: UserAuth = useContext(AuthContext);
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
