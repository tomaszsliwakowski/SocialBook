import { useState } from "react";
import { PopularTagsCreator } from "../../assets/assets";
import SelectBarCreator from "./SelectBarCreator";
import styles from "./blogCreator.module.css";
import { IoMdAdd } from "react-icons/io";
import Tag from "./Tag";

export default function Tags() {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [enterTagValue, setEnterTagValue] = useState<string>("");

  const selectTagsHandler = (item: string): void => {
    if (selectedTags.includes(item)) {
      setSelectedTags((prev) => prev.filter((tag) => tag !== item));
    } else {
      setSelectedTags((prev) => [...prev, item]);
    }
  };

  const deleteSelectedTag = (item: string): void => {
    setSelectedTags((prev) => prev.filter((tag) => tag !== item));
  };

  const addEnterTag = (): void => {
    if (enterTagValue !== "") {
      setSelectedTags((prev) => [...prev, enterTagValue]);
    }
  };

  return (
    <div className={styles.creator__editor__tags}>
      <h4>Tags ({selectedTags.length}/10)</h4>
      <div className={styles.creator__editor__tags__selectBar}>
        <div className={styles.creator__editor__tags__selectBar__input}>
          <input
            type="text"
            placeholder="Enter Your Tag"
            value={enterTagValue}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEnterTagValue(e.target.value)
            }
          />
          <button onClick={() => addEnterTag()}>
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
            <Tag
              key={index}
              name={item}
              deleteSelectedTag={deleteSelectedTag}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}
