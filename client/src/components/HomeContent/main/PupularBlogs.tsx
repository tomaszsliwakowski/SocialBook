import { BlogsType } from "../../BlogsContent/Main";
import Blog from "./Blog";
import styles from "./main.module.css";

type PROPS = {
  blogs: BlogsType[];
};

export default function PupularBlogs({ blogs }: PROPS) {
  return (
    <div className={styles.popular}>
      <h2>Popular Blogs</h2>
      {blogs.length !== 0 ? (
        <ul className={styles.popular__list}>
          {blogs.map((item, id) => (
            <Blog blog={item} key={id} />
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
