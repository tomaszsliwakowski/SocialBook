import { BiUser } from "react-icons/bi";
import styles from "./blog.module.css";
import { timeExpiredFrom } from "../../assets/assets";
import { SlOptionsVertical } from "react-icons/sl";

export default function Comments() {
  return (
    <div className={styles.blog__comments__content}>
      <ul>
        <li className={styles.blog__comment}>
          <div className={styles.blog__comment__user}>
            <BiUser />
          </div>
          <div className={styles.blog__comment__content}>
            <div className={styles.blog__comment__contentHead}>
              <span className={styles.blog__comment__userName}>test</span>
              <div className={styles.blog__comment__contentHead__con}>
                <span>{timeExpiredFrom("312312321")}</span>
                <div className={styles.blog__comment__content__modal}>
                  <SlOptionsVertical />
                </div>
              </div>
            </div>
            <p>agfjeswghewghewguhwegiuhwegiuwhegiuwehgiuh</p>
          </div>
        </li>
      </ul>
    </div>
  );
}
