import styles from "../../blogCreator.module.css";
import ImageContent from "./ImageContent";
import TextEditor from "./TextEditor";

type PROPS = {
  theme: string;
  editorContentHandler: Function;
};

export default function TextAndImageContentCreator({
  theme,
  editorContentHandler,
}: PROPS) {
  return (
    <div className={styles.contentModal__TextAndImage}>
      <div className={styles.contentModal__ImageContent}>
        <ImageContent />
      </div>
      <TextEditor theme={theme} editorContentHandler={editorContentHandler} />
    </div>
  );
}
