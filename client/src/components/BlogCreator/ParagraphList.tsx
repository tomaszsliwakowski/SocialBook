import Paragraph from "./Paragraph";
import styles from "./blogCreator.module.css";

export default function ParagraphList() {
  return (
    <div className={styles.creator__editor__paragraphList}>
      <h4>Blog Content (3/4)</h4>
      <button className={styles.creator__editor__AddBtn}>Add Content</button>
      <ul>
        <Paragraph />
      </ul>
    </div>
  );
}
