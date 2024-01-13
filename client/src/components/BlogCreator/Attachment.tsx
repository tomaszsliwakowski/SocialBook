import styles from "./blogCreator.module.css";
import { FaRegTrashAlt } from "react-icons/fa";

export default function Attachment() {
  return (
    <div className={styles.creator__editor__attachment}>
      <div>
        <div className={styles.creator__editor__smallBaner}>small baner</div>
        <div className={styles.creator__editor__mainBaner}>main baner</div>
      </div>
      <div className={styles.creator__editor__action}>
        <button>
          <FaRegTrashAlt />
        </button>
        <button>Share Blog</button>
      </div>
    </div>
  );
}
