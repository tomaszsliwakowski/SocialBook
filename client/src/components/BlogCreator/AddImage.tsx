import { useEffect, useState } from "react";
import styles from "./blogCreator.module.css";
import { FaImage } from "react-icons/fa";

type PROPS = {
  handleImageClick: Function;
  image: FormData | null;
  name: string;
  handleImageChange: Function;
  inputRef: React.MutableRefObject<HTMLInputElement | null>;
};

export default function AddImage({
  handleImageClick,
  image,
  name,
  handleImageChange,
  inputRef,
}: PROPS) {
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    if (!image) setImageUrl("");
    const file = image?.get("file") as File;
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setImageUrl(fileUrl);
    }
  }, [image]);

  return (
    <div
      onClick={() => handleImageClick(inputRef)}
      className={styles.creator__editor__Addimage}
    >
      <span>Add Image</span>
      {imageUrl && imageUrl !== "" ? (
        <img src={imageUrl} alt="Image to add" />
      ) : (
        <FaImage />
      )}
      <input
        name={name}
        ref={inputRef}
        type="file"
        style={{ display: "none" }}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          handleImageChange(e)
        }
      />
    </div>
  );
}
