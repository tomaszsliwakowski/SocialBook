import BlogsType from "./BlogsType";
import styles from "./blogs.module.css";

export interface BlogTypeProps {
  typeShow: string | null;
  selectBlogsAction: Function;
}

export default function BlogTypes({
  typeShow,
  selectBlogsAction,
}: BlogTypeProps) {
  return (
    <div className={styles.blogs__types}>
      <BlogsType
        typeShow={typeShow}
        selectBlogsAction={selectBlogsAction}
        name="For You"
      />
      <span>|</span>
      <BlogsType
        typeShow={typeShow}
        selectBlogsAction={selectBlogsAction}
        name="Watched"
      />
    </div>
  );
}
