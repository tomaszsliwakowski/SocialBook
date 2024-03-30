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
import { timeSpanHandler } from "../../assets/assets";
import { AuthContext, UserAuth } from "../../context/Auth";
import GetMoreBlogs from "./GetMoreBlogs";

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
  userName: string;
};

export default function Main() {
  const { User }: UserAuth = useContext(AuthContext);
  const [searchParams, setSearchParams] = useSearchParams({});
  const search = searchParams.get("search");
  const searchType = searchParams.get("searchtype");
  const tag = searchParams.get("tag");
  const typeShow = searchParams.get("type");
  const timeSpan = searchParams.get("timespan");
  const pageMin = searchParams.get("pageMin");
  const pageMax = searchParams.get("pageMax");
  const [searchValue, setSearchValue] = useState<string>(search || "");
  const [searchTypeValue, setSearchTypeValue] = useState<string>(
    searchType || "title"
  );
  const [blogs, setBlogs] = useState<BlogsType[]>([]);
  const [maxBlogs, setMaxBlogs] = useState<boolean>(false);

  const { loading, error, data, refetch } = useQuery(GET_BLOGS, {
    variables: {
      type: typeShow,
      search: search || "",
      searchType: searchType || "title",
      tag: tag || "",
      timeSpan: timeSpanHandler(timeSpan),
      pageMin: pageMinHandler(),
      pageMax: parseInt(pageMax || "9"),
      userId: User.id,
    },
  });

  function pageMinHandler(): number {
    if (!pageMin) return 0;
    if ((blogs && blogs.length ? blogs.length : 0) < parseInt(pageMin)) {
      setSearchParams((prev) => {
        prev.set("pageMin", "0");
        return prev;
      });
      return 0;
    } else {
      return parseInt(pageMin);
    }
  }

  useEffect(() => {
    if (!loading && !error && data) {
      const newData = data.getBlogs;
      if (!pageMin || !pageMax) return;
      setBlogs((prev) => {
        if (pageMin === "0") {
          return newData;
        } else {
          return [...prev, ...newData];
        }
      });
    }
  }, [data]);

  useEffect(() => {
    refetch();
  }, [timeSpan, tag, typeShow, searchValue, pageMax, pageMin]);

  const handleSearchValue = (value: string): void => {
    setSearchValue(value);
  };
  const handleSearchTypeValue = (value: string): void => {
    setSearchTypeValue(value);
  };
  const searchBlogsAction = (): void => {
    if (searchValue === "") {
      setSearchParams((prev) => {
        prev.delete("search");
        return prev;
      });
    } else {
      setSearchParams((prev) => {
        prev.set("search", searchValue);
        prev.set("searchtype", searchTypeValue);
        return prev;
      });
    }
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

  const getMorePosts = () => {
    if (!pageMin || !pageMax) return;
    if (!blogs) return;
    if (blogs.length === parseInt(pageMax)) {
      setSearchParams((prev) => {
        prev.set("pageMin", pageMax);
        prev.set("pageMax", (parseInt(pageMax) + 9).toString());
        return prev;
      });
    }
  };

  useEffect(() => {
    if (!pageMax) return;
    if (!blogs) return;
    if (blogs.length === parseInt(pageMax)) {
      setMaxBlogs((prev) => (prev ? false : prev));
    } else {
      setMaxBlogs(true);
    }
  }, [blogs]);

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
      {blogs.length >= 9 ? (
        <GetMoreBlogs maxBlogs={maxBlogs} getMorePosts={getMorePosts} />
      ) : null}
    </div>
  );
}
