import { Action } from "../../../../reducers/BlogCreatorReducer";
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
};

export default function ParagraphContent({
  setModalStep,
  selectedParagraph,
  theme,
  editorContentHandler,
}: PROPS) {
  return (
    <>
      <div className={styles.contentModal__body__main}>
        <span>Add your paragraph content:</span>
        <div className={styles.contentModal__body__main__paragraphList}>
          {selectedParagraph === "Text" ? (
            <TextEditor
              theme={theme}
              editorContentHandler={editorContentHandler}
            />
          ) : null}
          {selectedParagraph === "Image" ? <ImageContentCreator /> : null}
          {selectedParagraph === "TextAndImage" ? (
            <TextAndImageContentCreator
              theme={theme}
              editorContentHandler={editorContentHandler}
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
