import React, { useEffect, useState } from "react";
import styles from "../../App.module.css";
import {  useParams } from 'react-router-dom';
import {AiOutlineDelete} from "react-icons/ai"
import {BiUserCircle} from "react-icons/bi"
import { collection ,updateDoc ,doc,getDocs} from "firebase/firestore";
import { db} from "../../firebase/firebase-config";
import { ComType, PostType } from "./post";
import { storage } from "../../firebase/firebase-config";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import { UserType } from "./post";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/firebase-config";
import {AiFillLike} from "react-icons/ai"

type ParamsID = {
  postID :string
}

const SinglePost = () => {
  const PostCollectionRef = collection(db, "Posts");
  const UsersCollectionRef = collection(db, "Users");
  let { postID } = useParams<ParamsID>();
  const [image,setimage] = useState<string>("white")
  const [imageList, setimageList] = useState<Array<string>>([]);
  const imageListRef = ref(storage, "image/");
  const [Posts, setPosts] = useState<Array<PostType>>([]);
  const [user, setuser] = useState<UserType>({
    email: "",
    id:"",
    password:"",
    userID:"",
    username:""
  });
  const [ComInput,setComInput] = useState<string>("")

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

  useEffect(() => {
    getImg();
    getPosts();
    onAuthStateChanged(auth, (currentUser) => {
      if(currentUser?.email){
       getUser(currentUser.uid)
      }
    })
  }, []);

  const PostContainer: PostType[] = Posts.filter((item) => item.id === postID);

 useEffect(()=>{
  const img = imageList.find((it) => it.includes(PostContainer[0].img))
  if(img !== undefined){
    setimage(img)
  }
 },[PostContainer,Posts,imageList])

 const AddLike = async(item:PostType) =>{
  if(item.like.indexOf(user.email) === -1){
    const postDoc = doc(db,"Posts",item.id)
    const newField = {like: item.like.concat(user.email)}
    await updateDoc(postDoc,newField)
    await getPosts()
  }else{
    const postDoc = doc(db,"Posts",item.id)
    const newField = {like: item.like.filter((it)=> it !== user.email)}
    await updateDoc(postDoc,newField)
    await getPosts()
  }
 }

 const AddComment = async (item:PostType) =>{
  if(ComInput !== ""){
  const date: Date = new Date();
  const DateTime: number = date.getTime();
  const postDoc = doc(db,"Posts",item.id)
    const newField = {com: item.com.concat({
      user:user.username,
      date: date.toLocaleString(),
      datetime: DateTime,
      comment: ComInput
    })}
    const updatefield = {com: newField.com.sort(sortCom)}
   await updateDoc(postDoc,updatefield)
    await getPosts()
   setComInput("")
}
 }

 function sortCom(a: ComType, b: ComType) {
  return b.datetime - a.datetime ;
}
  return (
    <>
      {PostContainer.length ? PostContainer.map((item) => (
        <div
          key={item.id}
          className={styles.SinglePostBody}
        >
          <div className={styles.SinglePostTitle}>
            <p>{item.title} </p>
          </div>
          {
            item.img !== "none"?
            <div className={styles.SinglePostIMG}>
            <img src={image} alt="photo"  />
          </div>:null
          }
          {
            item.desc.length > 0?
            <div className={styles.SinglePostDesc}>
            <p>{item.desc}</p>
          </div>:null
          }
          <div className={styles.SinglePostCom}>
            <div className={styles.SinglePostAddCom}>
            <textarea placeholder="Write Comment..." value={ComInput} onChange={(e:React.ChangeEvent<HTMLTextAreaElement>)=> setComInput(e.target.value)} disabled={user.email ? false : true}></textarea>
            <span>
            <button disabled={user.email ? false : true} onClick={()=> AddComment(item)} >Add Comment</button>
            <button  disabled={user.email ? false : true} onClick={()=> AddLike(item)} className={item.like.indexOf(user.email) !== -1 ? styles.SinglePostAddLikeactive : styles.SinglePostAddLike }>{"Like" + " "+ `${item.like.length}`}</button>
            </span>
            </div >
              <ul className={styles.SinglePostShowCom} >
                {item.com.length ? item.com.map((el,id)=>(
                  <li key={id}>
                  <div className={styles.com_user}>
                        <span>
                          <BiUserCircle />
                          {el.user}
                        </span>
                        <p className={styles.com_date}>{el.date}</p>
                          <AiOutlineDelete className={styles.com_svg} />
                      </div>
                      <div className={styles.com_text}>
                      {el.comment}
                      </div>
                  </li>
                )):null}
              </ul> 
          </div>
        </div>
      )): <div>ERROR</div> }

    </>
  );
};

export default SinglePost;

