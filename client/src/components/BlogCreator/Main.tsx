import Attachment from "./Attachment";
import ParagraphList from "./ParagraphList";
import Tags from "./Tags";
import Title from "./Title";
import styles from "./blogCreator.module.css";

export default function Main() {
  return (
    <div className={styles.creator__main}>
      <h2>Blog Creator</h2>
      <div className={styles.creator__editor}>
        <div className={styles.creator__editor__content}>
          <Title />
          <ParagraphList />
          <Tags />
        </div>
        <Attachment />
      </div>
    </div>
  );
}
