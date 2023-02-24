import React, { useEffect, useState } from "react";
import styles from "../../App.module.css";
import { Link } from "react-router-dom";
import { BtnSortType } from "../body/homeBody";
import { db } from "../../firebase/firebase-config";
import { collection, getDocs ,doc, updateDoc } from "firebase/firestore";
import { storage } from "../../firebase/firebase-config";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import {  onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/firebase-config";

export type PostType = {
  id: string;
  postID: string;
  title: string;
  desc: string;
  img: string;
  date: string;
  datetime: number;
  like: Array<string>,
  com: Array<ComType>
  user: string
};

export type UserType ={
  email: string,
  id:string,
  password:string,
  userID:string,
  username:string
}

type props = {
  searchPost: string;
  BtnSortPost: BtnSortType;

};

export type ComType = {
  user:string,
  date:string,
  datetime:number
  comment:string
}


const Post = ({ searchPost, BtnSortPost }: props) => {
  const [showPost, setshowPost] = useState<Array<PostType>>([]);
  const [imageList, setimageList] = useState<Array<string>>([]);
  const PostCollectionRef = collection(db, "Posts");
  const UsersCollectionRef = collection(db, "Users");
  const imageListRef = ref(storage, "image/");
  const [Posts, setPosts] = useState<Array<PostType>>([]);
  const [user, setuser] = useState<UserType>({
    email: "",
    id:"",
    password:"",
    userID:"",
    username:""
  });
 

  const getPosts = async () => {
    const data = await getDocs(PostCollectionRef);
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
  function sortPostLike(a: PostType, b: PostType) {
    return b.like.length - a.like.length;
  }

  const SortPost = () => {
    if (!BtnSortPost.new && searchPost === "") {
      setshowPost(Posts.sort(sortPostNew));
    } else if (!BtnSortPost.like && searchPost === "") {
      setshowPost(Posts.sort(sortPostLike))
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
    onAuthStateChanged(auth, (currentUser) => {
     if(currentUser?.email){
      getUser(currentUser.uid)
     }
   })
  }, []);
  
  const getUser = async (Userid:string)=>{
    const UsersData = await getDocs(UsersCollectionRef);
    const Users: any = UsersData.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    })); 
    const UserObj = Users.filter((item:UserType)=> item.userID === Userid)
    setuser(UserObj[0]);
  }

  useEffect(() => {
    SortPost();
  }, [searchPost, BtnSortPost, Posts]);

  const AddLike = async(post:PostType) =>{
    if(post.like.indexOf(user.email) === -1 ){
      const postDoc = doc(db,"Posts",post.id)
      const newField = {like: post.like.concat(user.email)}
      await updateDoc(postDoc,newField)
      await getPosts()
    }else{
      const postDoc = doc(db,"Posts",post.id)
      const newField = {like: post.like.filter((it)=> it !== user.email)}
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
                <p>{post.user}</p>
                <p>{post.date}</p>
              </span>
              <span className={styles.PostOpen}>
                <Link to={`/post/${post.id}`}>
                  Open
                  
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
              <button disabled={user.email ? false : true}  onClick={()=> AddLike(post)} className={post.like.indexOf("user") !== -1 ? styles.PostAddLikeactive : styles.PostAddLike } >LIKE {post.like.length}</button>
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
