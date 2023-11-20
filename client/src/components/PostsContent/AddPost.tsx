import { IoMdClose } from "react-icons/io";
import styles from "./posts.module.css";
import { FaImage } from "react-icons/fa6";
import { useState } from "react";

type PROPS = {
  setAddPostModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function AddPost({ setAddPostModal }: PROPS) {
  const [postText, setPostText] = useState("");
  return (
    <div className={styles.posts__addPost__body}>
      <div className={styles.addPosts__header}>
        <h2>Add Post</h2>
        <IoMdClose size={30} onClick={() => setAddPostModal(false)} />
      </div>
      <div className={styles.addPosts__content}>
        <textarea
          value={postText}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setPostText(e.target.value)
          }
          placeholder="What are you thinking about?"
        />
        <div>
          <span>Add to post</span>
          <FaImage />
        </div>
      </div>
      <div className={styles.addPost__action}>
        <button disabled={postText === ""}>Share Post</button>
      </div>
    </div>
  );
}
