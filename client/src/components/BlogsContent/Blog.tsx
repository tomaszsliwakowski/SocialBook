import styles from "./blogs.module.css";
import { Link } from "react-router-dom";
import { BlogRouteBuilder } from "../../routes";
import { BlogsType } from "./Main";
import BlogStat from "./BlogStat";
import BlogDesc from "./BlogDesc";
import BlogPanel from "./BlogPanel";
import BlogTags from "./BlogTags";

type PROPS = {
  blog: BlogsType;
};

export default function Blog({ blog }: PROPS) {
  return (
    <li className={styles.blogs__content__element}>
      <Link
        to={BlogRouteBuilder(blog.id)}
        className={styles.blogs__content__image}
      >
        <img src={blog.miniature} alt="miniature" />
        <BlogStat likes={blog.likes} comments={blog.comments} />
      </Link>
      <BlogTags tags={blog.tags} />
      <BlogDesc title={blog.title} blogContent={blog.blogContent} />
      <BlogPanel
        userName={blog.userName}
        createdAt={blog.createdAt}
        creatorId={blog.user_id}
      />
    </li>
  );
}
