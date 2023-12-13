import styles from "./posts.module.css";
import { FiHome, FiSearch } from "react-icons/fi";
import { MdPeopleOutline } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";
import { BiUser } from "react-icons/bi";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { NavLink, SetURLSearchParams } from "react-router-dom";
import { PROFILE_ROUTE } from "../../routes";

type PROPS = {
  setAddPostModal: React.Dispatch<React.SetStateAction<boolean>>;
  setSearchParams: SetURLSearchParams;
  navParams: {
    nav: string | null;
    search: string | null;
  };
};

export default function Menu({
  setAddPostModal,
  setSearchParams,
  navParams,
}: PROPS) {
  const [searchActive, setSearchActive] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const handleSearchPosts = () => {
    if (searchValue === "") return;
    setSearchParams((prev) => {
      prev.delete("nav");
      prev.set("search", searchValue.toLocaleLowerCase());
      return prev;
    });
    setSearchActive(false);
  };

  return (
    <div className={styles.posts__menu}>
      <div className={styles.posts__add}>
        <button onClick={() => setAddPostModal(true)}>Add Post</button>
      </div>
      <ul>
        <li
          style={
            navParams.nav === "all" && navParams.search === null
              ? { fontWeight: "500", color: "#3a86ff" }
              : {}
          }
          onClick={() =>
            setSearchParams((prev) => {
              prev.delete("search");
              prev.set("nav", "all");
              return prev;
            })
          }
        >
          <FiHome />
          <span>For you</span>
        </li>

        <li
          style={
            navParams.nav === "watched" && navParams.search === null
              ? { fontWeight: "500", color: "#3a86ff" }
              : {}
          }
          onClick={() =>
            setSearchParams((prev) => {
              prev.delete("search");
              prev.set("nav", "watched");
              return prev;
            })
          }
        >
          <MdPeopleOutline />
          <span>Watched</span>
        </li>
        <li
          style={
            navParams.nav === null && navParams.search !== null
              ? { fontWeight: "500", color: "#3a86ff" }
              : {}
          }
        >
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
                <input
                  type="text"
                  placeholder="Search posts"
                  value={searchValue}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setSearchValue(e.target.value)
                  }
                />
              </div>
              <button onClick={() => handleSearchPosts()}>Search</button>
            </div>
          ) : null}
        </li>
        <li
          style={
            navParams.nav === "liked" && navParams.search === null
              ? { fontWeight: "500", color: "#3a86ff" }
              : {}
          }
          onClick={() =>
            setSearchParams((prev) => {
              prev.delete("search");
              prev.set("nav", "liked");
              return prev;
            })
          }
        >
          <FaRegHeart />
          <span>Liked</span>
        </li>
        <NavLink to={PROFILE_ROUTE}>
          <BiUser />
          <span>Profile</span>
        </NavLink>
      </ul>
    </div>
  );
}
