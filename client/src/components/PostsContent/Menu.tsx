import styles from "./posts.module.css";
import { FiHome, FiSearch } from "react-icons/fi";
import { MdPeopleOutline } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";
import { BiUser } from "react-icons/bi";

export default function Menu() {
  return (
    <div className={styles.posts__menu}>
      <div className={styles.posts__add}>
        <button>Add Post</button>
      </div>
      <ul>
        <li>
          <FiHome />
          <span>For you</span>
        </li>
        <li>
          <MdPeopleOutline />
          <span>Watched</span>
        </li>
        <li>
          <FiSearch />
          <span>Search</span>
        </li>
        <li>
          <FaRegHeart />
          <span>Liked</span>
        </li>
        <li>
          <BiUser />
          <span>Profile</span>
        </li>
      </ul>
    </div>
  );
}
