import styles from "./posts.module.css";
import Post from "./Post";
import { PostType } from "./Main";
import { UserType } from "../../context/Auth";
import { useEffect } from "react";
import { useInView } from "react-hook-inview";

type PROPS = {
  postsData: PostType[];
  User: UserType;
  postsType: string;
  setPostsPage: React.Dispatch<React.SetStateAction<number>>;
  pageCount: string;
};

export default function Posts({
  postsData,
  User,
  postsType,
  pageCount,
  setPostsPage,
}: PROPS) {
  const [ref, isVisible] = useInView({
    threshold: 1,
  });

  useEffect(() => {
    if (isVisible) {
      if (postsData.length === parseInt(pageCount) * 10) {
        setPostsPage((prev) => prev + 1);
      }
    }
  }, [isVisible]);

  console.log(postsData);
  return (
    <div className={styles.posts__content}>
      <ul className={styles.posts__list}>
        {postsData.length > 0
          ? postsData.map((item, id) => (
              <Post
                key={id}
                postData={item}
                User={User}
                postsType={postsType}
                pageCount={pageCount}
              />
            ))
          : null}
      </ul>
      {postsData.length >= 10 ? (
        <div ref={ref} className={styles.posts__loadingMore}>
          end
        </div>
      ) : null}
    </div>
  );
}
