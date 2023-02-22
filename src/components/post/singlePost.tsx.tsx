import React, { useEffect, useState } from "react";
import styles from "../../App.module.css";
import {  useParams } from 'react-router-dom';
import {AiOutlineDelete} from "react-icons/ai"
import {BiUserCircle} from "react-icons/bi"
import { collection ,updateDoc ,doc,getDocs} from "firebase/firestore";
import { db} from "../../firebase/firebase-config";
import { PostType } from "./post";
import { storage } from "../../firebase/firebase-config";
import { ref, listAll, getDownloadURL } from "firebase/storage";

type ParamsID = {
  postID :string
}

const SinglePost = () => {
  const usersCollectionRef = collection(db, "Posts");
  let { postID } = useParams<ParamsID>();
  const [image,setimage] = useState<string>("white")
  const [imageList, setimageList] = useState<Array<string>>([]);
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

  useEffect(() => {
    getImg();
    getPosts();
  }, []);

  const PostContainer: PostType[] = Posts.filter((item) => item.id === postID);

 useEffect(()=>{
  const img = imageList.find((it) => it.includes(PostContainer[0].img))
  if(img !== undefined){
    setimage(img)
  }
 },[PostContainer,Posts,imageList])

 const AddLike = async(item:PostType) =>{
  if(item.like.indexOf("user") === -1){
    const postDoc = doc(db,"Posts",item.id)
    const newField = {like: item.like.concat("user")}
    await updateDoc(postDoc,newField)
    await getPosts()
  }else{
    const postDoc = doc(db,"Posts",item.id)
    const newField = {like: item.like.filter((it)=> it !== "user")}
    await updateDoc(postDoc,newField)
    await getPosts()
  }
 }


  return (
    <>
      {PostContainer.length ? PostContainer.map((item) => (
        <div
          key={item.id}
          className={styles.SinglePostBody}
        >
          <div className={styles.SinglePostTitle}>
            <p>{item.title}</p>
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
            <textarea placeholder="Write Comment..." ></textarea>
            <span>
            <button>Add Comment</button>
            <button  onClick={()=> AddLike(item)} className={item.like.indexOf("user") !== -1 ? styles.SinglePostAddLikeactive : styles.SinglePostAddLike }>{"Like" + " " +`${item.like.length}`}</button>
            </span>
            </div >
              <ul className={styles.SinglePostShowCom}>
                <li>
                <div className={styles.com_user}>
                      <span>
                        <BiUserCircle />
                        {item.user}
                      </span>
                      <p className={styles.com_date}>21.02.2023</p>
                        <AiOutlineDelete className={styles.com_svg} />
                    </div>
                    <div className={styles.com_text}>
                     {item.com}
                    </div>
                </li>
              </ul> 
          </div>
        </div>
      )): <div>ERROR</div> }

    </>
  );
};

export default SinglePost;

