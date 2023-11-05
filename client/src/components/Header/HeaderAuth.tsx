import styles from "./header.module.css";
import { BiUser } from "react-icons/bi";

export default function HeaderAuth() {
  return (
    <div className={styles.header__auth}>
      <span>
        <BiUser />
      </span>
    </div>
  );
}
