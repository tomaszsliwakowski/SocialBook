import { ReactNode } from "react";
import styles from "../blogCreator.module.css";

type PROPS = {
  children: ReactNode;
  closeModal: Function;
  id: string;
  title: string;
  modalStep: number;
};

export default function ModalBody({
  children,
  closeModal,
  id,
  title,
  modalStep,
}: PROPS) {
  return (
    <div id={id} onClick={(e) => closeModal(e)} className={styles.contentModal}>
      <div
        className={`${
          modalStep === 0
            ? styles.contentModal__body
            : styles.contentModal__bodyWider
        }`}
      >
        <div className={styles.contentModal__body__head}>
          <h2>{title}</h2>
        </div>
        {children}
      </div>
    </div>
  );
}
