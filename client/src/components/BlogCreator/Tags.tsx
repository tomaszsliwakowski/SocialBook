import styles from "./blogCreator.module.css";
import { IoMdAdd, IoIosClose } from "react-icons/io";

export default function Tags() {
  return (
    <div className={styles.creator__editor__tags}>
      <h4>Tags (2/10)</h4>
      <div className={styles.creator__editor__tags__selectBar}>
        <div className={styles.creator__editor__tags__selectBar__input}>
          <input type="text" placeholder="Enter Your Tag" />
          <button>
            <IoMdAdd />
          </button>
        </div>
        <div className={styles.creator__editor__tags__selectBar__select}>
          <select>
            <option>List of tags</option>
            <option>Travel</option>
            <option>LifeStyle</option>
          </select>
        </div>
      </div>
      <div className={styles.creator__editor__tags__list}>
        <ul>
          <li>
            <span>Travel</span>
            <IoIosClose />
          </li>
          <li>
            <span>LifeStyle</span>
            <IoIosClose />
          </li>
        </ul>
      </div>
    </div>
  );
}
