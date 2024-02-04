import { EditorContentType, ModalStateType } from "../../Main";
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
  modalStatus: ModalStateType;
  state: EditorContentType | undefined;
};

export default function ParagraphContent({
  setModalStep,
  selectedParagraph,
  theme,
  editorContentHandler,
  editorContent,
  textContentHandler,
  modalStatus,
  state,
}: PROPS) {
  return (
    <>
      <div className={styles.contentModal__body__main}>
        <span>{modalStatus.type} your paragraph content:</span>
        <div className={styles.contentModal__body__main__paragraphList}>
          {selectedParagraph === "Text" ? (
            <TextEditor
              theme={theme}
              editorContentHandler={textContentHandler}
              state={state}
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
              state={state}
            />
          ) : null}
        </div>
      </div>
      {modalStatus.type === "Add" ? (
        <ActionButtons
          setModalStep={setModalStep}
          actionOne="back"
          actionTwo="sub"
          nameOne="Back"
          nameTwo="Add"
        />
      ) : null}
      {modalStatus.type === "Edit" ? (
        <ActionButtons
          setModalStep={setModalStep}
          actionOne="off"
          actionTwo="edit"
          nameOne="Close"
          nameTwo="Edit"
        />
      ) : null}
    </>
  );
}
