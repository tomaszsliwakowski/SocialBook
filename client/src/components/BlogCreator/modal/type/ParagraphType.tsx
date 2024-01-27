import styles from "../../blogCreator.module.css";
import PragraphTypeText from "./PragraphTypeText";
import ParagraphTypeImage from "./ParagraphTypeImage";
import ParagraphTypeTextAndImage from "./ParagraphTypeTextAndImage";
import ActionButtons from "../ActionButtons";

type PROPS = {
  selectedParagraph: string;
  selectParagraphHandler: Function;
  setModalStep: Function;
};
export interface ParagrapTypePROPS {
  selectedParagraph: string;
  selectParagraphHandler: Function;
  type: string;
}

export default function ParagraphType({
  selectedParagraph,
  selectParagraphHandler,
  setModalStep,
}: PROPS) {
  return (
    <>
      <div className={styles.contentModal__body__main}>
        <span>Select type of paragraph:</span>
        <div className={styles.contentModal__body__main__paragraphList}>
          <ul>
            <PragraphTypeText
              selectedParagraph={selectedParagraph}
              selectParagraphHandler={selectParagraphHandler}
              type="Text"
            />
            <ParagraphTypeImage
              selectedParagraph={selectedParagraph}
              selectParagraphHandler={selectParagraphHandler}
              type="Image"
            />
            <ParagraphTypeTextAndImage
              selectedParagraph={selectedParagraph}
              selectParagraphHandler={selectParagraphHandler}
              type="TextAndImage"
            />
          </ul>
        </div>
      </div>
      <ActionButtons
        setModalStep={setModalStep}
        actionOne="off"
        actionTwo="next"
        nameOne="Close"
        nameTwo="Next"
      />
    </>
  );
}
