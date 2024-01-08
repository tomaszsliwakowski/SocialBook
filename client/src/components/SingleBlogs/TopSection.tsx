import Baner from "./Baner";
import Title from "./Title";
import TopMenu from "./TopMenu";
import styles from "./blog.module.css";

export default function TopSection() {
  return (
    <div className={styles.blog__top}>
      <Baner />
      <TopMenu />
      <Title />
    </div>
  );
}
