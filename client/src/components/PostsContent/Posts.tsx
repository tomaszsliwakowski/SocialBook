import styles from "./posts.module.css";
import Post from "./Post";
import { PostType } from "./Main";
import { UserType } from "../../context/Auth";
import { useEffect, useState } from "react";

type PROPS = {
  postsData: PostType[];
  User: UserType;
  setPostsPage: React.Dispatch<React.SetStateAction<number>>;
  pageCount: string;
  setPostsData: React.Dispatch<React.SetStateAction<PostType[]>>;
  refetchUser: Function;
};

export default function Posts({
  postsData,
  User,
  pageCount,
  setPostsPage,
  setPostsData,
  refetchUser,
}: PROPS) {
  const [maxPosts, setMaxPosts] = useState<boolean>(false);
  const GetMorePosts = () => {
    if (postsData.length === parseInt(pageCount) * 10) {
      setPostsPage((prev) => prev + 1);
    }
  };
  useEffect(() => {
    if (postsData.length === parseInt(pageCount) * 10) {
      setMaxPosts((prev) => (prev ? false : prev));
    } else {
      setMaxPosts(true);
    }
  }, [postsData]);

  return (
    <div className={styles.posts__content}>
      <ul className={styles.posts__list}>
        {postsData.length > 0
          ? postsData.map((item, id) => (
              <Post
                key={id}
                postData={item}
                User={User}
                setPostsData={setPostsData}
                refetchUser={refetchUser}
              />
            ))
          : null}
        {postsData.length >= 10 ? (
          <button
            disabled={maxPosts}
            className={styles.posts__loadingMore}
            onClick={() => GetMorePosts()}
          >
            {maxPosts ? "End of posts" : "Show more"}
          </button>
        ) : null}
      </ul>
    </div>
  );
}
