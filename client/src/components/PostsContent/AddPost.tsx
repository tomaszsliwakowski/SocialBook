import { IoMdClose } from "react-icons/io";
import styles from "./posts.module.css";
import { FaImage } from "react-icons/fa6";
import { useEffect, useRef, useState } from "react";

type PROPS = {
  setAddPostModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function AddPost({ setAddPostModal }: PROPS) {
  const [postText, setPostText] = useState("");
  const [image, setImage] = useState<null | File>(null);
  const [shareDisable, setShareDisable] = useState(true);
  const inputRef: React.MutableRefObject<HTMLInputElement | null> =
    useRef(null);

  const handleImageClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      setImage(file);
    }
  };

  useEffect(() => {
    console.log(image);
    setShareDisable(() => {
      if (postText !== "" || (image !== null && image)) {
        return false;
      } else {
        return true;
      }
    });
  }, [image, postText]);

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
        <div onClick={() => handleImageClick()}>
          <span>Add image to post</span>
          {image ? (
            <img src={URL.createObjectURL(image)} alt="Image to add" />
          ) : (
            <FaImage />
          )}
          <input
            ref={inputRef}
            id="image-upload"
            onChange={handleImageChange}
            type="file"
            style={{ display: "none" }}
          />
        </div>
      </div>
      <div className={styles.addPost__action}>
        <button disabled={shareDisable}>Share Post</button>
      </div>
    </div>
  );
}
