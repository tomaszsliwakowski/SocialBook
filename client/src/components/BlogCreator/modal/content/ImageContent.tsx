import { useRef, useState } from "react";
import styles from "../../blogCreator.module.css";
import { FaImage } from "react-icons/fa";

export default function ImageContent() {
  const [image, setImage] = useState<string>("");
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
        return setImage("");
      }
      const file = e.target.files[0];
      const redData = new FileReader();
      redData.readAsDataURL(file);
      redData.onload = () => {
        if (typeof redData.result === "string") {
          setImage(redData.result);
        }
      };
    }
  };

  const DeleteImage = (): void => {
    setImage("");
  };
  return (
    <div
      onClick={() => handleImageClick(inputRef)}
      className={styles.creator__editor__Addimage}
    >
      <span>Add Image</span>
      {image ? <img src={image} alt="Image to add" /> : <FaImage />}
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
