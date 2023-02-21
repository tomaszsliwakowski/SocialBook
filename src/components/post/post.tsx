import React, { useEffect, useState } from "react";
import styles from "../../App.module.css";
import { db } from "../../firebase/firebase-config";
import { collection, getDocs } from "firebase/firestore";
import { storage } from "../../firebase/firebase-config";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import { BsDoorOpen } from "react-icons/bs";
import { Link } from "react-router-dom";
import { BtnSortType } from "../body/homeBody";

export type PostType = {
  id: string;
  postID: string;
  title: string;
  desc: string;
  img: string;
  date: string;
  datetime: number;
  like: number;
};

type props = {
  searchPost: string;
  BtnSortPost: BtnSortType;
  Posts: Array<PostType>
  imageList:Array<string>
};

const Post = ({ searchPost, BtnSortPost,Posts,imageList }: props) => {
  const [showPost, setshowPost] = useState<Array<PostType>>([]);
  function sortPostNew(a: PostType, b: PostType) {
    return b.datetime - a.datetime;
  }
  const SortPost = () => {
    if (BtnSortPost.new) {
      setshowPost(Posts.sort(sortPostNew));
    } else if (BtnSortPost.like) {
      return;
    } else if (searchPost !== "") {
      setshowPost(
        Posts.filter((item) =>
          item.title
            .toLocaleLowerCase()
            .includes(searchPost.toLocaleLowerCase())
        )
      );
    }
  };


  useEffect(() => {
    SortPost();
  }, [searchPost, BtnSortPost, Posts]);

  return (
    <>
      {showPost.length ? (
        showPost.map((post, id) => (
          <li key={id}>
            <div className={styles.PostTop}>
              <span>
                <p>T0k3M</p>
                <p>{post.date}</p>
              </span>
              <span className={styles.PostOpen}>
                <Link to={`/post/${post.id}`}>
                  Open
                  <BsDoorOpen />
                </Link>
              </span>

              <h3>{post.title}</h3>
            </div>
            <div className={styles.PostContent}>
              {post.img !== "none" ? (
                <div>
                  <Link to={`/post/${post.id}`}>
                    <img
                      src={imageList.find((item) => item.includes(post.img))}
                      alt={post.img}
                    />
                  </Link>
                </div>
              ) : null}
              <div className={styles.PostDesc}>
                <p>{post.desc}</p>
              </div>
            </div>
            <span className={styles.ReadMore}>
              <Link to={`/post/${post.id}`}>Read more...</Link>
            </span>
            <div className={styles.PostBottom}>
              <Link to={`/post/${post.id}`}>
                <p>Comments</p>
              </Link>
              <p>LIKE</p>
            </div>
          </li>
        ))
      ) : (
        <li className={styles.NotFound}>Not Found!</li>
      )}
    </>
  );
};

export default Post;
