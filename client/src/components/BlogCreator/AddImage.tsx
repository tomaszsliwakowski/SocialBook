import styles from "./blogCreator.module.css";
import { FaImage } from "react-icons/fa";

type PROPS = {
  handleImageClick: Function;
  image: string | null;
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
  return (
    <div
      onClick={() => handleImageClick(inputRef)}
      className={styles.creator__editor__Addimage}
    >
      <span>Add Image</span>
      {image && image !== "" ? (
        <img src={image} alt="Image to add" />
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
