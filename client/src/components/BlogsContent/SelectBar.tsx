import { useEffect, useState } from "react";
import styles from "./blogs.module.css";
import { MdKeyboardArrowDown } from "react-icons/md";
import { MdKeyboardArrowUp } from "react-icons/md";

type PROPS = {
  headName: string;
  defaultValue: string;
  list: string[];
  id: string;
};

export default function SelectBar({ headName, defaultValue, list, id }: PROPS) {
  const [listStatus, setlistStatus] = useState(false);
  const [selectTag, setSelectTag] = useState(defaultValue);

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
    setSelectTag(item);
    setlistStatus(false);
  };

  return (
    <div className={styles.blogs__selectBar}>
      <div>
        <h3>{headName}:</h3>
        <div className={styles.blogs__selectBar__tag}>
          <input
            id={id}
            type="checkbox"
            className={styles.blogs__selectBar__check}
            checked={listStatus}
            onChange={() => setlistStatus((prev) => !prev)}
          />
          <span>{selectTag}</span>
          {listStatus ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
          <ul
            id={id}
            className={
              listStatus
                ? `${styles.blogs__selectBar__tagList}`
                : `${styles.blogs__selectBar__tagList_hidden}`
            }
          >
            {list.map((item, num) => (
              <li id={id} key={num} onClick={() => handleStateChange(item)}>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
