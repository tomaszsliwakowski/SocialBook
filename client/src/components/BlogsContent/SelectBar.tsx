import { useState } from "react";
import styles from "./blogs.module.css";
import { MdKeyboardArrowDown } from "react-icons/md";
import { MdKeyboardArrowUp } from "react-icons/md";

export default function SelectBar() {
  const [selectTags, setSelectTags] = useState(false);
  return (
    <div className={styles.blogs__selectBar}>
      <div>
        <h3>Popular tags:</h3>
        <div
          className={styles.blogs__selectBar__tag}
          onClick={() => setSelectTags((prev) => !prev)}
        >
          <span>Choose...</span>
          {selectTags ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
          <ul
            className={
              selectTags
                ? `${styles.blogs__selectBar__tagList}`
                : `${styles.blogs__selectBar__tagList_hidden}`
            }
          >
            <li>Choose</li>
            <li>cars</li>
            <li>sports</li>
            <li>food</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
