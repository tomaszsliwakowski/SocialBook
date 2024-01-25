import styles from "../../blogCreator.module.css";
import ImageContentCreator from "./ImageContentCreator";
import TextAndImageContentCreator from "./TextAndImageContentCreator";
import TextContentCreator from "./TextContentCreator";

type PROPS = {
  SetModalStep: Function;
  selectedParagraph: string;
};

export default function ParagraphContent({
  SetModalStep,
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
      <div className={styles.contentModal__body__action}>
        <button onClick={() => SetModalStep("back")}>Back</button>
        <button
          onClick={() => SetModalStep("sub")}
          className={styles.contentModal__body__action__add}
        >
          Add
        </button>
      </div>
    </>
  );
}
