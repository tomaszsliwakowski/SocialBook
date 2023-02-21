import React, { useEffect, useState } from "react";
import styles from "../../App.module.css";
import { PostType } from "../../App";
import {  useParams } from 'react-router-dom';
import { postProps } from "../body/homeBody";
import {AiOutlineDelete} from "react-icons/ai"
import {BiUserCircle} from "react-icons/bi"
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
 },[PostContainer,Posts,imageList])


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
            <button className={styles.SinglePostAddLike}>{"Like" + " " +`${item.like}`}</button>
            </span>
            </div >
              <ul className={styles.SinglePostShowCom}>
                <li>
                <div className={styles.com_user}>
                      <span>
                        <BiUserCircle />
                        user
                      </span>
                      <p className={styles.com_date}>21.02.2023</p>
                        <AiOutlineDelete className={styles.com_svg} />
                    </div>
                    <div className={styles.com_text}>
                      kommmmm
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

