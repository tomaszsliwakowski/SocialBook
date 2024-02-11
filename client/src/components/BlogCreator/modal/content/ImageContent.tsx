import { useEffect, useRef, useState } from "react";
import styles from "../../blogCreator.module.css";
import { FaImage } from "react-icons/fa";
import { ImagesContentType } from "../../Main";
import { TypeImageEnum } from "./ImageContentCreator";

type PROPS = {
  editorContentHandler: Function;
  type?: keyof typeof TypeImageEnum;
  images?: ImagesContentType;
};

export default function ImageContent({
  editorContentHandler,
  type,
  images,
}: PROPS) {
  const [imageUrl, setImageUrl] = useState("");
  const inputRef: React.MutableRefObject<HTMLInputElement | null> =
    useRef(null);

  useEffect(() => {
    const image = images && type ? images[type] : null;
    if (!image) return setImageUrl("");
    const file = image.get("file") as File;
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      if (type) {
        setImageUrl(fileUrl);
      }
    }
  }, [images]);

  const handleImageClick = (
    Ref: React.MutableRefObject<HTMLInputElement | null>
  ): void => {
    if (Ref.current) {
      Ref.current.click();
      DeleteImage();
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      if (!e.target.files[0]) return;
      if (e.target.files[0].size > 2097152) {
        alert("File is too big!");
        return editorContentHandler(null, type);
      }
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("file", file);
      editorContentHandler(formData, type);
    }
  };
  const DeleteImage = () => {
    return editorContentHandler(null, type);
  };

  return (
    <div
      onClick={() => handleImageClick(inputRef)}
      className={styles.creator__editor__Addimage}
    >
      <span>Add Image</span>
      {imageUrl && type ? (
        <img src={imageUrl} alt="Image to add" />
      ) : (
        <FaImage />
      )}
      <input
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
