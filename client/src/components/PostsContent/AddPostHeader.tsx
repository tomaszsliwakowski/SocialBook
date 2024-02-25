import { IoMdClose } from "react-icons/io";
import styles from "./posts.module.css";

type PROPS = {
  handleModalSet: Function;
};

export default function AddPostHeader({ handleModalSet }: PROPS) {
  return (
    <div className={styles.addPosts__header}>
      <h2>Add Post</h2>
      <IoMdClose size={30} onClick={() => handleModalSet(false)} />
    </div>
  );
}
