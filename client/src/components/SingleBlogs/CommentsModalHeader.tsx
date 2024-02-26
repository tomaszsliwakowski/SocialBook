import { IoMdClose } from "react-icons/io";
import styles from "./blog.module.css";

type PROPS = {
  modalStatusHandler: Function;
};

export default function CommentsModalHeader({ modalStatusHandler }: PROPS) {
  return (
    <div className={styles.blog__comments__modal__body__header}>
      <h2>Comment</h2>
      <IoMdClose size={30} onClick={() => modalStatusHandler(false)} />
    </div>
  );
}
