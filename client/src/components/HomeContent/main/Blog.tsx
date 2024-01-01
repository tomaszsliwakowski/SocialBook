import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../../BlogsContent/blogs.module.css";
import { AiOutlineHeart } from "react-icons/ai";
import { FaRegCommentAlt } from "react-icons/fa";
import { motion, useAnimation, useInView } from "framer-motion";
import { BiUser } from "react-icons/bi";
import { timeExpiredFrom } from "../../../assets/assets";
import { BsBookmarks, BsBookmarksFill } from "react-icons/bs";

export default function Blog() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const slideControls = useAnimation();
  const [saveStatus, setSaveStatus] = useState(false);
  useEffect(() => {
    if (isInView) {
      slideControls.start("visible");
    }
  }, [isInView]);

  return (
    <motion.li
      className={styles.blogs__content__element}
      variants={{
        hidden: { opacity: 0, y: 85 },
        visible: { opacity: 1, y: 0 },
      }}
      initial="hidden"
      animate={slideControls}
      transition={{ duration: 1.5, delay: 0.25 }}
      ref={ref}
    >
      <Link to={"/"} className={styles.blogs__content__image}>
        <img src="./travel.jpg" alt="img" />
      </Link>
      <div className={styles.blogs__content__tag}>
        <span>Travel</span>
      </div>
      <div className={styles.blogs__content__desc}>
        <h2>Lorem ipsum dolor sit amet consectetur adipisicing elit.</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta
          perspiciatis possimus nihil, harum odit atque vero exercitationem
          eaque id tempora. Consequatur, ratione consectetur! Inventore, esse
          magnam voluptatem possimus explicabo tenetur. Lorem, ipsum dolor sit
          amet consectetur adipisicing elit. Fugiat nam ullam neque doloribus
          ipsa sequi mollitia, fuga officia sapiente facere consectetur aperiam
          incidunt earum deserunt facilis delectus corporis iure unde?
        </p>
      </div>
      <div className={styles.blogs__content__info}>
        <div className={styles.blogs__content__user}>
          <div>
            <BiUser />
          </div>
          <div>
            <span>testowy</span>
            <span>{timeExpiredFrom("1703088958000")}</span>
          </div>
        </div>
        <div className={styles.blogs__content__action}>
          <div className={styles.blogs__content__react}>
            <span>
              <AiOutlineHeart />
              1231
            </span>
            <span>
              <FaRegCommentAlt />
              1231
            </span>
          </div>
          <div className={styles.blogs__content__save}>
            {saveStatus ? (
              <BsBookmarksFill onClick={() => setSaveStatus(false)} />
            ) : (
              <BsBookmarks onClick={() => setSaveStatus(true)} />
            )}
          </div>
        </div>
      </div>
    </motion.li>
  );
}
