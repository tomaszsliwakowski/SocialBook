import styles from "../blogCreator.module.css";
import PragraphTypeText from "./PragraphTypeText";
import ParagraphTypeImage from "./ParagraphTypeImage";
import ParagraphTypeTextAndImage from "./ParagraphTypeTextAndImage";

type PROPS = {
  closeModal: Function;
  selectedParagraph: string;
  SelectParagraphHandler: Function;
};
export interface ParagrapTypePROPS {
  selectedParagraph: string;
  SelectParagraphHandler: Function;
  type: string;
}

export default function ParagraphType({
  closeModal,
  selectedParagraph,
  SelectParagraphHandler,
}: PROPS) {
  return (
    <>
      <div className={styles.contentModal__body__main}>
        <span>Select type of paragraph:</span>
        <div className={styles.contentModal__body__main__paragraphList}>
          <ul>
            <PragraphTypeText
              selectedParagraph={selectedParagraph}
              SelectParagraphHandler={SelectParagraphHandler}
              type="Text"
            />
            <ParagraphTypeImage
              selectedParagraph={selectedParagraph}
              SelectParagraphHandler={SelectParagraphHandler}
              type="Image"
            />
            <ParagraphTypeTextAndImage
              selectedParagraph={selectedParagraph}
              SelectParagraphHandler={SelectParagraphHandler}
              type="TextAndImage"
            />
          </ul>
        </div>
      </div>
      <div className={styles.contentModal__body__action}>
        <button id="modalBtn" onClick={(e) => closeModal(e)}>
          Close
        </button>
        <button>Next</button>
      </div>
    </>
  );
}
