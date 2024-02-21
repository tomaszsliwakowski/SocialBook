import { useState } from "react";
import styles from "./blog.module.css";
import { BsBookmark, BsBookmarksFill } from "react-icons/bs";
import BlogImage from "./BlogImage";

type PROPS = {
  baner: string;
};

export default function Baner({ baner }: PROPS) {
  const [saveStatus, setSaveStatus] = useState(false);
  return (
    <div className={styles.blog__top__baner}>
      <BlogImage image={baner} alt="baner" width="100%" />
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
