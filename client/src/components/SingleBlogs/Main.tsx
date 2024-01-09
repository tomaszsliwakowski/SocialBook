import Comments from "./Comments";
import Content from "./Content";
import TopSection from "./TopSection";
import styles from "./blog.module.css";

export default function Main() {
  return (
    <div className={styles.blog__main}>
      <TopSection />
      <Content />
      <Comments />
    </div>
  );
}
