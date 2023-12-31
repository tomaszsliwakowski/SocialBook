import { useState } from "react";
import {
  PopularTags,
  TimeSpanList,
  sortOptionList,
  typeList,
} from "../../assets/assets";
import SearchBar from "./SearchBar";
import SelectBar from "./SelectBar";
import styles from "./blogs.module.css";
import { BsTrash } from "react-icons/bs";
import { useSearchParams } from "react-router-dom";
import Blogs from "./Blogs";

export default function Main() {
  const [searchParams, setSearchParams] = useSearchParams({});
  const search = searchParams.get("search");
  const searchType = searchParams.get("searchtype");
  const tag = searchParams.get("tag");
  const typeShow = searchParams.get("type");
  const sorting = searchParams.get("sorting");
  const timeSpan = searchParams.get("timespan");
  const [searchValue, setSearchValue] = useState<string>(search || "");
  const [searchTypeValue, setSearchTypeValue] = useState<string>(
    searchType || "title"
  );

  const handleSearchValue = (value: string) => {
    setSearchValue(value);
  };
  const handleSearchTypeValue = (value: string) => {
    setSearchTypeValue(value);
  };
  const searchBlogsAction = () => {
    if (searchValue === "") return;
    setSearchParams((prev) => {
      prev.set("search", searchValue);
      prev.set("searchtype", searchTypeValue);
      return prev;
    });
  };
  const selectBlogsAction = (name: string, value: string) => {
    setSearchParams((prev) => {
      prev.set(name, value);
      return prev;
    });
  };
  const handleClearParams = () => {
    setSearchParams((prev) => {
      prev.delete("search");
      prev.delete("searchtype");
      prev.set("sorting", "Latest");
      prev.set("tag", "All");
      prev.set("timespan", "All");
      prev.set("type", "For you");
      setSearchValue("");
      setSearchTypeValue("title");
      return prev;
    });
  };

  return (
    <div className={styles.blogs}>
      <div className={styles.blogs__filterBar}>
        <SearchBar
          handleSearchValue={handleSearchValue}
          searchValue={searchValue}
          searchBlogsAction={searchBlogsAction}
          handleSearchTypealue={handleSearchTypeValue}
          searchTypeValue={searchTypeValue}
        />
        <SelectBar
          defaultValue={typeShow || "For you"}
          id="typeModal"
          list={typeList}
          headName={"Type"}
          name="type"
          selectBlogsAction={selectBlogsAction}
        />
        <SelectBar
          defaultValue={tag || "All"}
          id="tagsModal"
          list={PopularTags}
          headName={"Popular tag"}
          name="tag"
          selectBlogsAction={selectBlogsAction}
        />
        <SelectBar
          defaultValue={sorting || "Latest"}
          id="sortModal"
          list={sortOptionList}
          headName={"Sorting"}
          name="sorting"
          selectBlogsAction={selectBlogsAction}
        />
        <SelectBar
          id="timeModal"
          defaultValue={timeSpan || "All"}
          list={TimeSpanList}
          headName={"Time span"}
          name="timespan"
          selectBlogsAction={selectBlogsAction}
        />
        <div
          className={styles.blogs__filter__clear}
          onClick={() => handleClearParams()}
        >
          <BsTrash />
        </div>
      </div>
      <Blogs />
    </div>
  );
}
