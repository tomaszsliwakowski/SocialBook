import { IoMdClose } from "react-icons/io";
import styles from "./posts.module.css";
import { FaImage } from "react-icons/fa6";
import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useMutation } from "@apollo/client";
import { ADD_POST } from "../../mutations/postsMutations";
import { UserType } from "../../context/Auth";
import imageCompression from "browser-image-compression";
import { PostType } from "./Main";
import AddPostHeader from "./AddPostHeader";
import AddPostContent from "./AddPostContent";
import AddPostAction from "./AddPostAction";

type PROPS = {
  setAddPostModal: React.Dispatch<React.SetStateAction<boolean>>;
  User: UserType;
  setPostsData: React.Dispatch<React.SetStateAction<PostType[]>>;
};

export default function AddPost({
  setAddPostModal,
  User,
  setPostsData,
}: PROPS) {
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

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      if (!e.target.files[0]) return;
      if (e.target.files[0].size > 2097152) {
        alert("File is too big!");
        return setImage(null);
      }
      const file = e.target.files[0];
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 800,
        useWebWorker: true,
      };
      const compressedFile = await imageCompression(file, options);
      const red = new FileReader();
      red.readAsDataURL(compressedFile);
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

  const [addPost] = useMutation(ADD_POST, {
    variables: {
      post_id: uuidv4(),
      user_id: User.id,
      post_text: postText,
      post_img: image || "",
      user_name: User.name,
      user_email: User.email,
    },
  });

  const sharePost = async () => {
    if (postText === "" && !image) return;
    await addPost()
      .then((res) => {
        let { addPost }: { addPost: PostType } = res.data;
        Object.assign(addPost, { createdAt: new Date().getTime().toString() });
        setPostsData((prev) => prev.concat(addPost));
        setAddPostModal(false);
      })
      .catch((res) => console.log(res));
  };

  const handleModalSet = (action: boolean) => {
    setAddPostModal(action);
  };

  return (
    <div className={styles.posts__addPost__body}>
      <AddPostHeader handleModalSet={handleModalSet} />
      <AddPostContent
        postText={postText}
        image={image}
        handleImageChange={handleImageChange}
        handleImageClick={handleImageClick}
        handleTextPost={handleTextPost}
        inputRef={inputRef}
      />
      <AddPostAction shareDisable={shareDisable} sharePost={sharePost} />
    </div>
  );
}
