import { useState } from "react";
import { timeExpiredFrom } from "../../assets/assets";
import styles from "./blogs.module.css";
import { BiUser } from "react-icons/bi";
import { BsBookmarks } from "react-icons/bs";
import { BsBookmarksFill } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";
import { FaRegCommentAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { StateStatusType } from "../PostsContent/Post";
import { UserType } from "../../context/Auth";
import { BlogRouteBuilder } from "../../routes";

type PROPS = {
  User: UserType;
};

export default function Blog({ User }: PROPS) {
  const [saveStatus, setSaveStatus] = useState(false);
  const [sub, setSub] = useState<StateStatusType>({
    postId: "",
    active: false,
  });
  return (
    <li className={styles.blogs__content__element}>
      <Link
        to={BlogRouteBuilder("lsrfuh90mbi24jsa0kj")}
        className={styles.blogs__content__image}
      >
        <img src="./travel.jpg" alt="img" />
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
            <div className={styles.blogs__content__userInfo}>
              <span>testowy</span>
              {User.email !== "" ? true ? <button>Follow</button> : null : null}
            </div>
            <span className={styles.blogs__content__createTime}>
              {timeExpiredFrom("1703088958000")}
            </span>
          </div>
        </div>
        <div className={styles.blogs__content__save}>
          {saveStatus ? (
            <BsBookmarksFill onClick={() => setSaveStatus(false)} />
          ) : (
            <BsBookmarks onClick={() => setSaveStatus(true)} />
          )}
        </div>
      </div>
    </li>
  );
}
