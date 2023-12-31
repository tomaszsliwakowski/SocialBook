import React from "react";
import styles from "./blogs.module.css";
import { FiSearch } from "react-icons/fi";

type PROPS = {
  handleSearchValue: Function;
  handleSearchTypealue: Function;
  searchBlogsAction: Function;
  searchValue: string;
  searchTypeValue: string;
};

export default function SearchBar({
  handleSearchValue,
  searchValue,
  searchBlogsAction,
  handleSearchTypealue,
  searchTypeValue,
}: PROPS) {
  return (
    <div className={styles.blogs__searchBar}>
      <input
        type="text"
        placeholder="Search..."
        value={searchValue}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          handleSearchValue(e.target.value)
        }
      />
      <div className={styles.blogs__searchBar__options}>
        <select
          value={searchTypeValue}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            handleSearchTypealue(e.target.value)
          }
        >
          <option value="title">Title</option>
          <option value="tag">Tag</option>
        </select>
        <div onClick={() => searchBlogsAction()}>
          <FiSearch />
        </div>
      </div>
    </div>
  );
}
