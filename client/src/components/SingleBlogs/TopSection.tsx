import Baner from "./Baner";
import Tags from "./Tags";
import Title from "./Title";
import TopMenu from "./TopMenu";
import styles from "./blog.module.css";
import { BlogType } from "./main";

type PROPS = {
  blog: BlogType;
};

export default function TopSection({ blog }: PROPS) {
  return (
    <div className={styles.blog__top}>
      <Baner baner={blog.baner} />
      <TopMenu createdAt={blog.createdAt} creatorId={blog.user_id} />
      <Tags tags={blog.tags} />
      <Title title={blog.title} />
    </div>
  );
}
