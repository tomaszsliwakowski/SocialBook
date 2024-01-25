import { IoText } from "react-icons/io5";
import { ParagrapTypePROPS } from "./ParagraphType";
import styles from "../../blogCreator.module.css";
import CheckBox from "./CheckBox";

export default function PragraphTypeText({
  selectedParagraph,
  SelectParagraphHandler,
  type,
}: ParagrapTypePROPS) {
  return (
    <li
      onClick={() => SelectParagraphHandler(type)}
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
        <IoText />
      </div>
    </li>
  );
}
