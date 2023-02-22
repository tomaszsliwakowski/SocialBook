import React, { useState } from "react";
import styles from "../../App.module.css";
import Header from "../header/header";
import Footer from "../footer/footer";
import { MdOutlineNewReleases } from "react-icons/md";
import { AiOutlineStar, AiOutlineSearch } from "react-icons/ai";
import AddPostForm from "../post/AddPostForm";
import Post from "../post/post";


export type BtnSortType = {
  new: boolean;
  like: boolean;
};


export default function Home() {
  const [search, setsearch] = useState<string>("");
  const [BtnSortPost, setBtnSortPost] = useState<BtnSortType>({
    new: true,
    like: false,
  });
  const HandlerBtnSort = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const { name } = event.target as HTMLButtonElement;
    if (name === "new") {
      setBtnSortPost({
        new: true,
        like: false,
      });
    } else {
      setBtnSortPost({
        new: false,
        like: true,
      });
    }
  };

  const handleinput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setsearch(e.target.value);
    setBtnSortPost({
      new: false,
      like: false,
    });
  };
  const check = () => {
    if (search === "") {
      setBtnSortPost({
        new: true,
        like: false,
      });
    } else {
      setBtnSortPost({
        new: false,
        like: false,
      });
    }
  };

  return (
    <>
      <Header />
      <div className={styles.Home_body}>
        <div className={styles.AddPost}>
          <AddPostForm />
        </div>
        <div className={styles.SearchPanel}>
          <div className={styles.SearchBar}>
            <div>
              <AiOutlineSearch />
              <input
                type="text"
                placeholder="Search..."
                value={search}
                onKeyUp={check}
                onChange={handleinput}
              />
            </div>
          </div>
          <div className={styles.SearchButton}>
            <button
              name="new"
              disabled={BtnSortPost.new}
              onClick={HandlerBtnSort}
            >
              New
              <MdOutlineNewReleases />
            </button>
            <button
              name="like"
              disabled={BtnSortPost.like}
              onClick={HandlerBtnSort}
            >
              Liked
              <AiOutlineStar />
            </button>
          </div>
        </div>
        <div className={styles.PostsPanel}>
          <ul>
            <Post searchPost={search} BtnSortPost={BtnSortPost}   />
          </ul>
        </div>
      </div>
      <Footer />
    </>
  );
}
