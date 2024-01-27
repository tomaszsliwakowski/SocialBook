import styles from "../blogCreator.module.css";

type PROPS = {
  setModalStep: Function;
  actionOne?: string;
  actionTwo?: string;
  nameOne?: string;
  nameTwo?: string;
};

export default function ActionButtons({
  setModalStep,
  actionOne,
  actionTwo,
  nameOne,
  nameTwo,
}: PROPS) {
  return (
    <div className={styles.contentModal__body__action}>
      <button onClick={() => setModalStep(actionOne)}>{nameOne}</button>
      <button
        onClick={() => setModalStep(actionTwo)}
        className={styles.contentModal__body__action__add}
      >
        {nameTwo}
      </button>
    </div>
  );
}
