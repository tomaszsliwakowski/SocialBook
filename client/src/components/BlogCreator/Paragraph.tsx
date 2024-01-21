import styles from "./blogCreator.module.css";
import {
  IoIosArrowDropupCircle,
  IoIosArrowDropdownCircle,
} from "react-icons/io";
import { FaImage } from "react-icons/fa";
import { IoText } from "react-icons/io5";
import { CreatorReducerType } from "../../reducers/BlogCreatorReducer";

type PROPS = {
  state: CreatorReducerType;
};

export default function Paragraph({ state }: PROPS) {
  return (
    <>
      <li className={styles.creator__editor__paragraph}>
        <span className={styles.creator__editor__paragraph__number}>1</span>
        <div className={styles.creator__editor__paragraph__content}>
          <PragraphTextAndImage />
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
      <li className={styles.creator__editor__paragraph}>
        <span className={styles.creator__editor__paragraph__number}>2</span>
        <div className={styles.creator__editor__paragraph__content}>
          <PragraphText />
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
      <li className={styles.creator__editor__paragraph}>
        <span className={styles.creator__editor__paragraph__number}>3</span>
        <div className={styles.creator__editor__paragraph__content}>
          <PragraphImage />
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
