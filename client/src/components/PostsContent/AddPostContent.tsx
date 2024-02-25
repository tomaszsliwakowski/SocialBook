import { FaImage } from "react-icons/fa";
import styles from "./posts.module.css";

type PROPS = {
  postText: string;
  handleTextPost: Function;
  handleImageClick: Function;
  image: string | null;
  handleImageChange: Function;
  inputRef: React.MutableRefObject<HTMLInputElement | null>;
};

export default function AddPostContent({
  postText,
  image,
  handleImageChange,
  handleImageClick,
  handleTextPost,
  inputRef,
}: PROPS) {
  return (
    <div className={styles.addPosts__content}>
      <textarea
        value={postText}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
          handleTextPost(e)
        }
        placeholder="What are you thinking about?"
      />
      <div onClick={() => handleImageClick()}>
        <span>Add image to post</span>
        {image ? <img src={image} alt="Image to add" /> : <FaImage />}
        <input
          ref={inputRef}
          id="image-upload"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleImageChange(e)
          }
          type="file"
          style={{ display: "none" }}
        />
      </div>
    </div>
  );
}
