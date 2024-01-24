import styles from "../blogCreator.module.css";
import { FaCheck } from "react-icons/fa6";

type PROPS = {
  selected: boolean;
};

export default function CheckBox({ selected }: PROPS) {
  return (
    <div
      className={`${
        selected
          ? styles.contentModal__selectParagraphType__checked
          : styles.contentModal__selectParagraphType__check
      }`}
    >
      {selected ? <FaCheck /> : null}
    </div>
  );
}
