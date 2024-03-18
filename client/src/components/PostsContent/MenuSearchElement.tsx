import { FiSearch } from "react-icons/fi";
import styles from "./posts.module.css";
import { IoMdClose } from "react-icons/io";

type PROPS = {
  nav: string | null;
  search: string | null;
  searchActive: boolean;
  searchValue: string;
  handleSearchPosts: Function;
  handleSearchActive: Function;
  handleSetSearchValue: Function;
};

export default function MenuSearchElement({
  nav,
  search,
  searchActive,
  searchValue,
  handleSearchActive,
  handleSearchPosts,
  handleSetSearchValue,
}: PROPS) {
  return (
    <li
      style={
        nav === null && search !== null
          ? { fontWeight: "500", color: "#3a86ff" }
          : {}
      }
    >
      <div
        className={styles.posts__menu__el}
        onClick={() => handleSearchActive(true)}
      >
        <FiSearch />
        <span>Search</span>
      </div>
      {searchActive ? (
        <div className={styles.search__wrapper}>
          <div className={styles.search__header}>
            <p>Search</p>
            <IoMdClose size={30} onClick={() => handleSearchActive(false)} />
          </div>
          <div className={styles.search__input}>
            <input
              type="text"
              placeholder="Search posts"
              value={searchValue}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleSetSearchValue(e.target.value)
              }
            />
          </div>
          <button onClick={() => handleSearchPosts()}>Search</button>
        </div>
      ) : null}
    </li>
  );
}
