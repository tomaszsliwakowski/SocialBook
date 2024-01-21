import styles from "../blogCreator.module.css";
import PragraphTypeText from "./PragraphTypeText";
import ParagraphTypeImage from "./ParagraphTypeImage";
import ParagraphTypeTextAndImage from "./ParagraphTypeTextAndImage";
import {
  Action,
  CreatorReducerType,
} from "../../../reducers/BlogCreatorReducer";

type PROPS = {
  selectedParagraph: string;
  SelectParagraphHandler: Function;
  ModalOff: Function;
  dispatch: React.Dispatch<Action>;
};
export interface ParagrapTypePROPS {
  selectedParagraph: string;
  SelectParagraphHandler: Function;
  type: string;
}

export default function ParagraphType({
  selectedParagraph,
  SelectParagraphHandler,
  ModalOff,
  dispatch,
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
        <button onClick={() => ModalOff()}>Close</button>
        <button>Next</button>
      </div>
    </>
  );
}
