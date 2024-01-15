import styles from "./blogCreator.module.css";

type PROPS = {
  closeModal: Function;
};

export default function ParagraphType({ closeModal }: PROPS) {
  return (
    <>
      <div className={styles.contentModal__body__main}>
        <span>Select type of paragraph:</span>
        <div className={styles.contentModal__body__main__paragraphList}>
          <ul>
            <li>text</li>
            <li>image</li>
            <li>text&image</li>
          </ul>
        </div>
      </div>
      <div className={styles.contentModal__body__action}>
        <button id="modalBtn" onClick={(e) => closeModal(e)}>
          Close
        </button>
        <button>Next</button>
      </div>
    </>
  );
}
