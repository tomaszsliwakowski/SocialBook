import { EditorContentType } from "../../Main";
import styles from "../../blogCreator.module.css";
import ImageContent from "./ImageContent";
import { TypeImageEnum } from "./ImageContentCreator";
import TextEditor from "./TextEditor";

type PROPS = {
  theme: string;
  editorContentHandler: Function;
  editorContent: EditorContentType;
  textContentHandler: Function;
  state: EditorContentType | undefined;
};

export default function TextAndImageContentCreator({
  theme,
  editorContentHandler,
  editorContent,
  textContentHandler,
  state,
}: PROPS) {
  return (
    <div className={styles.contentModal__TextAndImage}>
      <div className={styles.contentModal__ImageContent}>
        <ImageContent
          editorContentHandler={editorContentHandler}
          images={editorContent}
          type={TypeImageEnum.image_0}
        />
      </div>
      <TextEditor
        theme={theme}
        editorContentHandler={textContentHandler}
        state={state}
      />
    </div>
  );
}
