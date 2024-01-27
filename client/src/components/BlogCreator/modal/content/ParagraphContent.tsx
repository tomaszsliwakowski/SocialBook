import styles from "../../blogCreator.module.css";
import ActionButtons from "../ActionButtons";
import ImageContentCreator from "./ImageContentCreator";
import TextAndImageContentCreator from "./TextAndImageContentCreator";
import TextContentCreator from "./TextContentCreator";

type PROPS = {
  setModalStep: Function;
  selectedParagraph: string;
};

export default function ParagraphContent({
  setModalStep,
  selectedParagraph,
}: PROPS) {
  return (
    <>
      <div className={styles.contentModal__body__main}>
        <span>Add your paragraph content:</span>
        <div className={styles.contentModal__body__main__paragraphList}>
          {selectedParagraph === "Text" ? <TextContentCreator /> : null}
          {selectedParagraph === "Image" ? <ImageContentCreator /> : null}
          {selectedParagraph === "TextAndImage" ? (
            <TextAndImageContentCreator />
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
