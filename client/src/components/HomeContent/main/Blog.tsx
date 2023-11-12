import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import styles from "./main.module.css";
import { AiOutlineHeart } from "react-icons/ai";
import { FaRegCommentAlt } from "react-icons/fa";
import { motion, useAnimation, useInView } from "framer-motion";

export default function Blog() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const slideControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      slideControls.start("visible");
    }
  }, [isInView]);

  return (
    <motion.li
      variants={{
        hidden: { opacity: 0, y: 85 },
        visible: { opacity: 1, y: 0 },
      }}
      initial="hidden"
      animate={slideControls}
      transition={{ duration: 1.5, delay: 0.25 }}
      ref={ref}
    >
      <Link to={"/"}>
        <img src="./cars.jpg" alt="blog" />
      </Link>
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
            Similique quia natus sint error? lorem
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
    </motion.li>
  );
}
