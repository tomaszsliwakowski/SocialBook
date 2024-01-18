import { ReactNode } from "react";
import styles from "../blogCreator.module.css";

type PROPS = {
  children: ReactNode;
  closeModal: Function;
  id: string;
  title: string;
};

export default function ModalBody({ children, closeModal, id, title }: PROPS) {
  return (
    <div id={id} onClick={(e) => closeModal(e)} className={styles.contentModal}>
      <div className={styles.contentModal__body}>
        <div className={styles.contentModal__body__head}>
          <h2>{title}</h2>
        </div>
        {children}
      </div>
    </div>
  );
}
