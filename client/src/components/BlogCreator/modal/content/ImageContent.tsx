import { useRef } from "react";
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
  const inputRef: React.MutableRefObject<HTMLInputElement | null> =
    useRef(null);

  const handleImageClick = (
    Ref: React.MutableRefObject<HTMLInputElement | null>
  ): void => {
    if (Ref.current) {
      Ref.current.click();
    }
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    DeleteImage();
    if (e.target.files) {
      if (!e.target.files[0]) return;
      if (e.target.files[0].size > 2097152) {
        alert("File is too big!");
        return editorContentHandler("", type);
      }
      const file = e.target.files[0];
      const redData = new FileReader();
      redData.readAsDataURL(file);
      redData.onload = () => {
        if (typeof redData.result === "string") {
          editorContentHandler(redData.result, type);
        }
      };
    }
  };

  const DeleteImage = (): void => {
    return editorContentHandler("", type);
  };

  return (
    <div
      onClick={() => handleImageClick(inputRef)}
      className={styles.creator__editor__Addimage}
    >
      <span>Add Image</span>
      {images && type ? (
        images[type] ? (
          <img src={images[type]} alt="Image to add" />
        ) : (
          <FaImage />
        )
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
