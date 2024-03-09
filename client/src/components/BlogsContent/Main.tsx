import { useContext, useEffect, useState } from "react";
import { PopularTags, TimeSpanList } from "../../assets/Library";
import SearchBar from "./SearchBar";
import SelectBar from "./SelectBar";
import styles from "./blogs.module.css";
import { BsTrash } from "react-icons/bs";
import { useSearchParams } from "react-router-dom";
import Blogs from "./Blogs";
import BlogTypes from "./BlogTypes";
import { useQuery } from "@apollo/client";
import { GET_BLOGS } from "../../Query/blogQuery";
import { AuthContext, UserAuth } from "../../context/Auth";
import { timeSpanHandler } from "../../assets/assets";

export type BlogsType = {
  id: string;
  user_id: string;
  title: string;
  blogContent: string;
  tags: string;
  baner: string;
  miniature: string;
  createdAt: string;
  likes: string;
  comments: string;
};

export default function Main() {
  const { User }: UserAuth = useContext(AuthContext);
  const [searchParams, setSearchParams] = useSearchParams({});
  const search = searchParams.get("search");
  const searchType = searchParams.get("searchtype");
  const tag = searchParams.get("tag");
  const typeShow = searchParams.get("type");
  const timeSpan = searchParams.get("timespan");
  const [searchValue, setSearchValue] = useState<string>(search || "");
  const [searchTypeValue, setSearchTypeValue] = useState<string>(
    searchType || "title"
  );
  const [blogs, setBlogs] = useState<BlogsType[]>([]);

  const { loading, error, data, refetch } = useQuery(GET_BLOGS, {
    variables: {
      type: typeShow,
      search: searchValue,
      searchType: searchTypeValue,
      tag: tag || "",
      timeSpan: timeSpanHandler(timeSpan),
      page: 0,
      userId: User.id,
    },
  });
  useEffect(() => {
    if (!loading && !error && data) {
      const newData = data.getBlogs;
      setBlogs(newData || []);
    }
  }, [data]);

  console.log(blogs);
  useEffect(() => {
    refetch();
  }, [timeSpan, tag, typeShow, searchValue]);

  const handleSearchValue = (value: string): void => {
    setSearchValue(value);
  };
  const handleSearchTypeValue = (value: string): void => {
    setSearchTypeValue(value);
  };
  const searchBlogsAction = (): void => {
    if (searchValue === "") return;
    setSearchParams((prev) => {
      prev.set("search", searchValue);
      prev.set("searchtype", searchTypeValue);
      return prev;
    });
  };
  const selectBlogsAction = (name: string, value: string): void => {
    setSearchParams((prev) => {
      prev.set(name, value);
      return prev;
    });
  };
  const handleClearParams = (): void => {
    setSearchParams((prev) => {
      prev.delete("search");
      prev.delete("searchtype");
      prev.set("tag", "All");
      prev.set("timespan", "All");
      setSearchValue("");
      setSearchTypeValue("title");
      return prev;
    });
  };

  return (
    <div className={styles.blogs}>
      <BlogTypes typeShow={typeShow} selectBlogsAction={selectBlogsAction} />
      <div className={styles.blogs__filterBar}>
        <SearchBar
          handleSearchValue={handleSearchValue}
          searchValue={searchValue}
          searchBlogsAction={searchBlogsAction}
          handleSearchTypealue={handleSearchTypeValue}
          searchTypeValue={searchTypeValue}
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
      <Blogs blogs={blogs} />
    </div>
  );
}
