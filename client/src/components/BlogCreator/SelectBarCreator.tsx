import { useEffect, useState } from "react";
import styles from "./blogCreator.module.css";
import { MdKeyboardArrowDown } from "react-icons/md";
import { MdKeyboardArrowUp } from "react-icons/md";

type PROPS = {
  headName: string;
  defaultValue: string;
  list: string[];
  id: string;
  selectTagsAction: Function;
  selectedTags: string[];
};

export default function SelectBarCreator({
  headName,
  defaultValue,
  list,
  id,
  selectTagsAction,
  selectedTags,
}: PROPS) {
  const [listStatus, setlistStatus] = useState(false);

  useEffect(() => {
    const close = (e: Event) => {
      let target = e.target as HTMLElement;
      if (target.id !== id) {
        setlistStatus(false);
      }
    };
    document.body.addEventListener("click", close);
    return () => {
      document.body.removeEventListener("click", close);
    };
  }, []);

  const handleStateChange = (item: string) => {
    selectTagsAction(item);
    setlistStatus(false);
  };

  return (
    <div className={styles.blogsCreator__selectBar}>
      <div>
        <h3>{headName}:</h3>
        <div className={styles.blogsCreator__selectBar__tag}>
          <input
            id={id}
            type="checkbox"
            className={styles.blogsCreator__selectBar__check}
            checked={listStatus}
            onChange={() => setlistStatus((prev) => !prev)}
          />
          <span>{defaultValue}</span>
          {listStatus ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
          <ul
            id={id}
            className={
              listStatus
                ? `${styles.blogsCreator__selectBar__tagList}`
                : `${styles.blogsCreator__selectBar__tagList_hidden}`
            }
          >
            {list.map((item, num) => (
              <li
                id={id}
                key={num}
                onClick={() => handleStateChange(item)}
                className={`${
                  selectedTags.includes(item)
                    ? styles.blogsCreator__selectedTags
                    : ""
                }`}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
