import { useState } from "react";
import { PopularTagsCreator } from "../../assets/assets";
import SelectBarCreator from "./SelectBarCreator";
import styles from "./blogCreator.module.css";
import { IoMdAdd, IoIosClose } from "react-icons/io";

export default function Tags() {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const selectTagsHandler = (item: string): void => {
    if (selectedTags.includes(item)) {
      setSelectedTags((prev) => prev.filter((tag) => tag !== item));
    } else {
      setSelectedTags((prev) => [...prev, item]);
    }
  };

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
          <SelectBarCreator
            defaultValue="List of tags"
            headName="Tags"
            list={PopularTagsCreator}
            id="creatortags"
            selectTagsAction={selectTagsHandler}
            selectedTags={selectedTags}
          />
        </div>
      </div>
      <div className={styles.creator__editor__tags__list}>
        <ul>
          {selectedTags.map((item, index) => (
            <li key={index}>
              <span>{item}</span>
              <IoIosClose
                onClick={() =>
                  setSelectedTags((prev) => prev.filter((tag) => tag !== item))
                }
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
