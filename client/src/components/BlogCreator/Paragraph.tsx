import styles from "./blogCreator.module.css";
import {
  IoIosArrowDropupCircle,
  IoIosArrowDropdownCircle,
} from "react-icons/io";
import { FaImage } from "react-icons/fa";
import { IoText } from "react-icons/io5";
import {
  ImageParagraphType,
  TextAndImageParagraphType,
  TextParagrafType,
} from "../../reducers/BlogCreatorReducer";

type PROPS = {
  id: number;
  state: TextParagrafType | TextAndImageParagraphType | ImageParagraphType;
};

export default function Paragraph({ state, id }: PROPS) {
  return (
    <>
      <li className={styles.creator__editor__paragraph}>
        <span className={styles.creator__editor__paragraph__number}>
          {id + 1}
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
            <button>Show</button>
            <button>Edit</button>
            <button>Delete</button>
          </div>
          <div>
            <IoIosArrowDropupCircle />
            <IoIosArrowDropdownCircle />
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
