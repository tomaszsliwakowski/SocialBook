import { Link } from "react-router-dom";
import styles from "./main.module.css";
import { AiOutlineHeart } from "react-icons/ai";
import { FaRegCommentAlt } from "react-icons/fa";

export default function Blog() {
  return (
    <li>
      <img src="./cars.jpg" alt="blog" />
      <div className={styles.blog__content}>
        <div className={styles.blog__content__one}>
          <span>2023-11-05</span>
          <div>
            <span>
              <strong>#</strong>Cars
            </span>
          </div>
        </div>
        <div className={styles.blog__content__two}>
          <h3>The best cars</h3>
          <span>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Reprehenderit beatae earum accusantium perferendis nulla numquam
            officia impedit esse dolore fugit distinctio, magni ad ipsa error.
            Similique quia natus sint error?
          </span>
        </div>
        <div className={styles.blog__content__three}>
          <Link to={"/"}>Read More</Link>
          <div className={styles.blog__like}>
            <span className={styles.heart}>
              <AiOutlineHeart />
              1200
            </span>
            <span className={styles.comment}>
              <FaRegCommentAlt />
              800
            </span>
          </div>
        </div>
      </div>
    </li>
  );
}
