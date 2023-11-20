import { BiUser } from "react-icons/bi";
import styles from "./posts.module.css";
import { AiOutlineHeart } from "react-icons/ai";
import { FaRegCommentAlt } from "react-icons/fa";
import { useState } from "react";
import { MdDone } from "react-icons/md";

export default function Post() {
  const [sub, setSub] = useState(false);
  return (
    <li>
      <div className={styles.post__header}>
        <div>
          <BiUser />
          <span>admin</span>
          <span>{new Date().toLocaleDateString()}</span>
        </div>
        {!sub ? (
          <button onClick={() => setSub(true)}>Follow</button>
        ) : (
          <div className={styles.follow} onClick={() => setSub(false)}>
            <MdDone />
          </div>
        )}
      </div>
      <div className={styles.post__content}>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere, odit
          laboriosam blanditiis qui reprehenderit dolore aliquid molestiae,
          impedit placeat nulla suscipit necessitatibus mollitia. Molestias et
          nemo beatae ut, veniam dolor!
        </p>
      </div>
      <div className={styles.post__action}>
        <span>
          <AiOutlineHeart /> Like
        </span>
        <span>
          <FaRegCommentAlt /> Comments
        </span>
      </div>
    </li>
  );
}
