import { FaRegCommentAlt } from "react-icons/fa";
import styles from "./blog.module.css";
import { AiOutlineHeart } from "react-icons/ai";
import { BiUser } from "react-icons/bi";

export default function TopMenu() {
  return (
    <div className={styles.blog__top__menu}>
      <div className={styles.blog__top__menu__user}>
        <BiUser />
        <div className={styles.blog__top__menu__userInfo}>
          <div>
            <span>test</span>
            <button>Follow</button>
          </div>
          <span className={styles.blog__top__menu__timer}>2 hours ago</span>
        </div>
      </div>
      <div className={styles.blog__top__menu__action}>
        <span>
          <AiOutlineHeart />
          1231
        </span>
        <span>
          <FaRegCommentAlt />
          1231
        </span>
      </div>
    </div>
  );
}
