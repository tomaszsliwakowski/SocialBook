import React from "react";
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

  return (
    <>
      {PostContainer?.map((item) => (
        <div
          key={item.id}
          style={{
            background:
              item.img !== "none"
                ? `url("${imageList.find((it) => it.includes(item.img))}")`
                : "white",
          }}
          className={styles.SinglePostBody}
        >
          <div className={styles.SinglePostContainer}></div>
        </div>
      ))}

    </>
  );
};

export default SinglePost;
