import React, { useEffect, useState } from "react";
import styles from "../../App.module.css";
import { BsDoorOpen } from "react-icons/bs";
import { Link } from "react-router-dom";
import { BtnSortType } from "../body/homeBody";
import { db } from "../../firebase/firebase-config";
import { collection, getDocs ,doc, updateDoc } from "firebase/firestore";
import { storage } from "../../firebase/firebase-config";
import { ref, listAll, getDownloadURL } from "firebase/storage";

export type PostType = {
  id: string;
  postID: string;
  title: string;
  desc: string;
  img: string;
  date: string;
  datetime: number;
  like: Array<string>,
  com: string,
  user: string
};

type props = {
  searchPost: string;
  BtnSortPost: BtnSortType;

};

const Post = ({ searchPost, BtnSortPost }: props) => {
  const [showPost, setshowPost] = useState<Array<PostType>>([]);
  const [imageList, setimageList] = useState<Array<string>>([]);
  const usersCollectionRef = collection(db, "Posts");
  const imageListRef = ref(storage, "image/");
  const [Posts, setPosts] = useState<Array<PostType>>([]);


  const getPosts = async () => {
    const data = await getDocs(usersCollectionRef);
    const PostData: any = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setPosts(PostData);
  };
  const getImg = async () => {
    await listAll(imageListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setimageList((prev) => [...prev, url]);
        });
      });
    });
  };

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
    getImg();
    getPosts();
  }, []);


  useEffect(() => {
    SortPost();
  }, [searchPost, BtnSortPost, Posts]);

  const AddLike = async(post:PostType) =>{
    if(post.like.indexOf("user") === -1){
      const postDoc = doc(db,"Posts",post.id)
      const newField = {like: post.like.concat("user")}
      await updateDoc(postDoc,newField)
      await getPosts()
    }else{
      const postDoc = doc(db,"Posts",post.id)
      const newField = {like: post.like.filter((it)=> it !== "user")}
      await updateDoc(postDoc,newField)
      await getPosts()
    }
   }

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
                <button>Comments</button>
              </Link>
             <button onClick={()=> AddLike(post)} className={post.like.indexOf("user") !== -1 ? styles.PostAddLikeactive : styles.PostAddLike } >LIKE {post.like.length}</button>
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
