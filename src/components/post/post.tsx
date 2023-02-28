import React, { useEffect, useState,useRef } from "react";
import styles from "../../App.module.css";
import { Link } from "react-router-dom";
import { BtnSortType } from "../body/homeBody";
import { db } from "../../firebase/firebase-config";
import { collection, getDocs ,doc, updateDoc,deleteDoc } from "firebase/firestore";
import { storage } from "../../firebase/firebase-config";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import {  onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/firebase-config";
import {AiFillLike} from "react-icons/ai"
import {FaCommentDots} from "react-icons/fa"
import {HiOutlineUserCircle} from "react-icons/hi"
import {SlOptionsVertical} from "react-icons/sl"
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
  postRedner: string;
};

export type ComType = {
  user:string,
  date:string,
  datetime:number
  comment:string
}
type opt = {
  id:string,
  show:boolean
}

const Post = ({ searchPost, BtnSortPost,postRedner }: props) => {
  const menuRef:any = useRef()
  const [showOpt, setshowopt] = useState<opt>({id:"",show:false});
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



  const getUser = async (Userid:string)=>{
    const UsersData = await getDocs(UsersCollectionRef);
    const Users: any = UsersData.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    })); 
    const UserObj = Users.filter((item:UserType)=> item.userID === Userid)
    setuser(UserObj[0]);
  }

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

   function sortPostNew(a: PostType, b: PostType) {
    return b.datetime - a.datetime;
  }
  function sortPostLike(a: PostType, b: PostType) {
    return b.like.length - a.like.length;
  }

  const SortPost = () => {
    if (BtnSortPost.new && searchPost === "") {
      return Posts.sort(sortPostNew)
    } else if (BtnSortPost.like && searchPost === "") {
      return Posts.sort(sortPostLike)
    } else if (searchPost !== "") {
      return  Posts.filter((item) =>
      item.title
        .toLocaleLowerCase()
        .includes(searchPost.toLocaleLowerCase())
    )
    }else{
      return Posts
    }
  };

  const ShowPostOpt =(id:string) =>{
    setshowopt((prev)=> ({
      id:id,
      show: !prev.show
    }))
    
  }

 const DeletePost = async(id:string) =>{
  const PostDoc = doc(db,"Posts",id)
  await deleteDoc(PostDoc)
  getPosts()
 }


   useEffect(() => {
    getImg();
    getPosts();
    onAuthStateChanged(auth, (currentUser) => {
     if(currentUser?.email){
      getUser(currentUser.uid)
     }
   })
  }, []);
  
  useEffect(()=>{
    getPosts();
    getImg();
  },[postRedner])


  const PostSorted :PostType[] = SortPost()
  return (
    <>
      {PostSorted?.length ? (
        PostSorted.map((post, id) => (
          <li key={id}>
            <div className={styles.PostTop}>
              <span>
                <p><HiOutlineUserCircle/>{post.user}</p>
                <p>{post.date}</p>
              </span>
              <span className={styles.PostOpen}  ref={menuRef} >
                <SlOptionsVertical onClick={()=> ShowPostOpt(post.id)}/>
               {showOpt.show && showOpt.id === post.id ?  <div className={styles.PostOpenPanel}  >
                  <Link to={`/post/${post.id}`} onClick={()=> (setshowopt({id:post.id , show: false})
                  )}>Open</Link>
                  {post.user === user.username ? <button onClick={()=> (
                    setshowopt({id:post.id , show: false},),
                    DeletePost(post.id))}>Delete</button> : null}
                </div> : null}
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
                <p>{post.desc}{<Link to={`/post/${post.id}`}>Read more...</Link>}</p>
              </div>
            </div>
            <div className={styles.PostBottom}>
              <Link to={`/post/${post.id}`}>
                <button>Comments <FaCommentDots/></button>
              </Link>
              <button disabled={user.email ? false : true}  onClick={()=> AddLike(post)} className={post.like.indexOf(user.email) !== -1 ? styles.PostAddLikeactive : styles.PostAddLike } ><AiFillLike/> {post.like.length}</button>
            </div>
          </li>
        ))
      ) : (
        <li className={styles.NotFound}>{searchPost !== "" ? "Not Found!" : "Loading..."}</li>
      )}
    </>
  );
};

export default Post;
