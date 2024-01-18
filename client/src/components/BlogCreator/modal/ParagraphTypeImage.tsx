import { FaImage } from "react-icons/fa";
import { ParagrapTypePROPS } from "./ParagraphType";
import styles from "../blogCreator.module.css";

export default function ParagraphTypeImage({
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
        <input type="checkbox" checked={selectedParagraph === type} />
      </div>
      <div>
        <FaImage />
      </div>
    </li>
  );
}
