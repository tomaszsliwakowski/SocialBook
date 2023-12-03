import { IoMdClose } from "react-icons/io";
import styles from "./posts.module.css";
import { FaImage } from "react-icons/fa6";
import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useMutation } from "@apollo/client";
import { ADD_POST } from "../../mutations/postsMutations";
import { UserType } from "../../context/Auth";

type PROPS = {
  setAddPostModal: React.Dispatch<React.SetStateAction<boolean>>;
  User: UserType;
};

export default function AddPost({ setAddPostModal, User }: PROPS) {
  const [postText, setPostText] = useState("");
  const [image, setImage] = useState<null | string>(null);
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
      const red = new FileReader();
      red.readAsDataURL(file);
      red.onload = () => {
        if (typeof red.result === "string") {
          setImage(red.result);
        }
      };
    }
  };

  const handleTextPost = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPostText((prev: string) => {
      if (prev.split("").length <= 300) {
        return e.target.value;
      } else {
        return prev;
      }
    });
  };

  useEffect(() => {
    setShareDisable(() => {
      if (postText !== "" || (image !== null && image)) {
        return false;
      } else {
        return true;
      }
    });
  }, [image, postText]);

  function saveImage() {
    if (!image) return;
    const formData = new FormData();
    formData.append("image", image);
    return formData;
  }
  const [addPost] = useMutation(ADD_POST, {
    variables: {
      post_id: uuidv4(),
      user_id: User.id,
      post_text: postText,
      post_img: image,
      user_name: User.name,
      user_email: User.email,
    },
  });
  const sharePost = async () => {
    if (postText === "" && !image) return;
    await addPost()
      .then((res) => console.log(res))
      .catch((res) => console.log(res));
  };

  return (
    <div className={styles.posts__addPost__body}>
      <div className={styles.addPosts__header}>
        <h2>Add Post</h2>
        <IoMdClose size={30} onClick={() => setAddPostModal(false)} />
      </div>
      <div className={styles.addPosts__content}>
        <textarea
          value={postText}
          onChange={(e) => handleTextPost(e)}
          placeholder="What are you thinking about?"
        />
        <div onClick={() => handleImageClick()}>
          <span>Add image to post</span>
          {image ? <img src={image} alt="Image to add" /> : <FaImage />}
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
        <button disabled={shareDisable} onClick={() => sharePost()}>
          Share Post
        </button>
      </div>
    </div>
  );
}
