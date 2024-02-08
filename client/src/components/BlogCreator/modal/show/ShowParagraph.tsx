import { ParagraphType } from "../../../../reducers/BlogCreatorReducer";
import styles from "../../blogCreator.module.css";
import ShowImages from "./ShowImages";
import ShowText from "./ShowText";
import ShowTextAndImage from "./ShowTextAndImage";

type PROPS = {
  paragraph: ParagraphType;
  modalOff: Function;
};

export default function ShowParagraph({ paragraph, modalOff }: PROPS) {
  const type: string = paragraph.paragraphType;
  return (
    <div className={styles.showParagraphBody}>
      {type === "Text" ? <ShowText content={paragraph.content} /> : null}
      {type === "TextAndImage" ? (
        <ShowTextAndImage paragraph={paragraph} />
      ) : null}
      {type === "Image" ? <ShowImages paragraph={paragraph} /> : null}
      <div className={styles.showParagraphBody__action}>
        <button onClick={() => modalOff()}>Close</button>
      </div>
    </div>
  );
}
