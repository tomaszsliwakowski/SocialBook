import styles from "./blogCreator.module.css";

export default function Title() {
  return (
    <div className={styles.creator__editor__title}>
      <h3>Title</h3>
      <input type="text" placeholder="Blog title" />
    </div>
  );
}
