import React, { useEffect, useState } from "react";
import styles from "../../App.module.css";
import { PostType } from "../../App";
import {  useParams } from 'react-router-dom';
import { postProps } from "../body/homeBody";
type ParamsID = {
  postID :string
}
const SinglePost = ({Posts,imageList}:postProps) => {
  let { postID } = useParams<ParamsID>();
  const PostContainer: PostType[] = Posts.filter((item) => item.id === postID);
  const [image,setimage] = useState<string>("white")

 useEffect(()=>{
  const img = imageList.find((it) => it.includes(PostContainer[0].img))
  if(img !== undefined){
    setimage(img)
  }
 },[PostContainer])


  return (
    <>
      {PostContainer.length ? PostContainer.map((item) => (
        <div
          key={item.id}
          className={styles.SinglePostBody}
        >
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
        </div>
      )): <div>ERROR</div> }

    </>
  );
};

export default SinglePost;

