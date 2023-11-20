import styles from "./posts.module.css";
import { FiHome, FiSearch } from "react-icons/fi";
import { MdPeopleOutline } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";
import { BiUser } from "react-icons/bi";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";

type PROPS = {
  setAddPostModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Menu({ setAddPostModal }: PROPS) {
  const [searchActive, setSearchActive] = useState(false);
  return (
    <div className={styles.posts__menu}>
      <div className={styles.posts__add}>
        <button onClick={() => setAddPostModal(true)}>Add Post</button>
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
          <div
            className={styles.posts__menu__el}
            onClick={() => setSearchActive(true)}
          >
            <FiSearch />
            <span>Search</span>
          </div>
          {searchActive ? (
            <div className={styles.search__wrapper}>
              <div className={styles.search__header}>
                <p>Search</p>
                <IoMdClose size={30} onClick={() => setSearchActive(false)} />
              </div>
              <div className={styles.search__input}>
                <input type="text" />
              </div>
              <button>Search</button>
            </div>
          ) : null}
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
