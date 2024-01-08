import { useState } from "react";
import styles from "./blog.module.css";
import { BsBookmark, BsBookmarksFill } from "react-icons/bs";

export default function Baner() {
  const [saveStatus, setSaveStatus] = useState(false);
  return (
    <div className={styles.blog__top__baner}>
      <img src="../travel.jpg" alt="img" />
      <div className={styles.blog__top__save}>
        {saveStatus ? (
          <BsBookmarksFill onClick={() => setSaveStatus(false)} />
        ) : (
          <BsBookmark onClick={() => setSaveStatus(true)} />
        )}
      </div>
    </div>
  );
}
