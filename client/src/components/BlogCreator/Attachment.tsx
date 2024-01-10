import styles from "./blogCreator.module.css";

export default function Attachment() {
  return (
    <div className={styles.creator__editor__attachment}>
      <div>
        <div className={styles.creator__editor__smallBaner}>small baner</div>
        <div className={styles.creator__editor__mainBaner}>main baner</div>
      </div>
      <div className={styles.creator__editor__action}>
        <button>Clear Creator</button>
        <button>Share Blog</button>
      </div>
    </div>
  );
}
