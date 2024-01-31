import { EditorContentType } from "../../Main";
import styles from "../../blogCreator.module.css";
import ActionButtons from "../ActionButtons";
import ImageContentCreator from "./ImageContentCreator";
import TextAndImageContentCreator from "./TextAndImageContentCreator";
import TextEditor from "./TextEditor";

type PROPS = {
  setModalStep: Function;
  selectedParagraph: string;
  theme: string;
  editorContentHandler: Function;
  editorContent: EditorContentType;
  textContentHandler: Function;
};

export default function ParagraphContent({
  setModalStep,
  selectedParagraph,
  theme,
  editorContentHandler,
  editorContent,
  textContentHandler,
}: PROPS) {
  return (
    <>
      <div className={styles.contentModal__body__main}>
        <span>Add your paragraph content:</span>
        <div className={styles.contentModal__body__main__paragraphList}>
          {selectedParagraph === "Text" ? (
            <TextEditor
              theme={theme}
              editorContentHandler={textContentHandler}
            />
          ) : null}
          {selectedParagraph === "Image" ? (
            <ImageContentCreator
              editorContentHandler={editorContentHandler}
              editorContent={editorContent}
            />
          ) : null}
          {selectedParagraph === "TextAndImage" ? (
            <TextAndImageContentCreator
              theme={theme}
              editorContentHandler={editorContentHandler}
              editorContent={editorContent}
              textContentHandler={textContentHandler}
            />
          ) : null}
        </div>
      </div>
      <ActionButtons
        setModalStep={setModalStep}
        actionOne="back"
        actionTwo="sub"
        nameOne="Back"
        nameTwo="Add"
      />
    </>
  );
}
