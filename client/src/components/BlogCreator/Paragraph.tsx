import styles from "./blogCreator.module.css";
import {
  IoIosArrowDropupCircle,
  IoIosArrowDropdownCircle,
} from "react-icons/io";
import { FaImage } from "react-icons/fa";
import { IoText } from "react-icons/io5";
import { ParagraphType } from "../../reducers/BlogCreatorReducer";

type PROPS = {
  num: number;
  state: ParagraphType;
  changeParagraphIndex: Function;
  deleteParagraphContent: Function;
  showParagraphContent: Function;
  editParagraphContent: Function;
};

export default function Paragraph({
  state,
  num,
  changeParagraphIndex,
  editParagraphContent,
  deleteParagraphContent,
  showParagraphContent,
}: PROPS) {
  return (
    <>
      <li className={styles.creator__editor__paragraph}>
        <span className={styles.creator__editor__paragraph__number}>
          {num + 1}
        </span>
        <div className={styles.creator__editor__paragraph__content}>
          {state.paragraphType === "Text" ? <PragraphText /> : null}
          {state.paragraphType === "Image" ? <PragraphImage /> : null}
          {state.paragraphType === "TextAndImage" ? (
            <PragraphTextAndImage />
          ) : null}
        </div>
        <div className={styles.creator__editor__paragraph__action}>
          <div>
            <button onClick={() => showParagraphContent(state.id)}>Show</button>
            <button onClick={() => editParagraphContent(state.id)}>Edit</button>
            <button onClick={() => deleteParagraphContent(state.id)}>
              Delete
            </button>
          </div>
          <div>
            <IoIosArrowDropupCircle
              onClick={() => changeParagraphIndex(state.id, "up")}
            />
            <IoIosArrowDropdownCircle
              onClick={() => changeParagraphIndex(state.id, "down")}
            />
          </div>
        </div>
      </li>
    </>
  );
}

const PragraphTextAndImage = () => {
  return (
    <>
      <span>
        <IoText />
        <p>Text</p>
      </span>
      <span>
        <FaImage />
        <p>Image</p>
      </span>
    </>
  );
};
const PragraphText = () => {
  return (
    <span>
      <IoText />
      <p>Text</p>
    </span>
  );
};
const PragraphImage = () => {
  return (
    <span>
      <FaImage />
      <p>Image</p>
    </span>
  );
};
