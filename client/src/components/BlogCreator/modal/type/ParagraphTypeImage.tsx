import { FaImage } from "react-icons/fa";
import { ParagrapTypePROPS } from "./ParagraphType";
import styles from "../../blogCreator.module.css";
import CheckBox from "./CheckBox";

export default function ParagraphTypeImage({
  selectedParagraph,
  selectParagraphHandler,
  type,
}: ParagrapTypePROPS) {
  return (
    <li
      onClick={() => selectParagraphHandler(type)}
      className={`${
        selectedParagraph === type
          ? styles.contentModal__selectParagraphType
          : ""
      }`}
    >
      <div>
        <CheckBox selected={selectedParagraph === type} />
      </div>
      <div className={styles.contentModal__selectParagraphType__icon}>
        <FaImage />
      </div>
    </li>
  );
}
