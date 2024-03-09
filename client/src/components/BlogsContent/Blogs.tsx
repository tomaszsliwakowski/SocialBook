import Blog from "./Blog";
import { BlogsType } from "./Main";
import styles from "./blogs.module.css";

type PROPS = {
  blogs: BlogsType[];
};

export default function Blogs({ blogs }: PROPS) {
  return (
    <div className={styles.blogs__content}>
      {blogs.length !== 0 ? (
        <ul className={styles.blogs__content__list}>
          {blogs.map((item, id) => (
            <Blog key={id} blog={item} />
          ))}
        </ul>
      ) : (
        <div className={styles.blogs__content__notFound}>
          Not found any blogs
        </div>
      )}
    </div>
  );
}
