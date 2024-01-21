import { useRef, useState } from "react";
import styles from "./blogCreator.module.css";
import { FaRegTrashAlt } from "react-icons/fa";
import AddImage from "./AddImage";
import { Action, CreatorReducerType } from "../../reducers/BlogCreatorReducer";

type ImageStateType = {
  miniature: string | null;
  baner: string | null;
};
type PROPS = {
  state: CreatorReducerType;
  dispatch: React.Dispatch<Action>;
};

export default function Attachment({ state, dispatch }: PROPS) {
  const [image, setImage] = useState<ImageStateType>({
    miniature: null,
    baner: null,
  });
  const inputRefMiniature: React.MutableRefObject<HTMLInputElement | null> =
    useRef(null);

  const inputRefBaner: React.MutableRefObject<HTMLInputElement | null> =
    useRef(null);

  const handleImageClick = (
    Ref: React.MutableRefObject<HTMLInputElement | null>
  ): void => {
    if (Ref.current) {
      Ref.current.click();
    }
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    DeleteImage(e.target.name);
    if (e.target.files) {
      if (!e.target.files[0]) return;
      if (e.target.files[0].size > 2097152) {
        alert("File is too big!");
        return setImage({ miniature: null, baner: null });
      }
      const file = e.target.files[0];
      const redData = new FileReader();
      redData.readAsDataURL(file);
      redData.onload = () => {
        if (typeof redData.result === "string") {
          setImage((prev) => ({ ...prev, [e.target.name]: redData.result }));
        }
      };
    }
  };

  const DeleteImage = (name: string): void => {
    if (name === "miniature" && image.miniature) {
      setImage((prev) => ({ ...prev, [name]: null }));
    }
    if (name === "baner" && image.baner) {
      setImage((prev) => ({ ...prev, [name]: null }));
    }
  };

  return (
    <div className={styles.creator__editor__attachment}>
      <div>
        <div className={styles.creator__editor__smallBaner}>
          <h3>Blog miniature</h3>
          <AddImage
            name="miniature"
            handleImageChange={handleImageChange}
            handleImageClick={handleImageClick}
            image={image.miniature}
            inputRef={inputRefMiniature}
          />
        </div>
        <div className={styles.creator__editor__mainBaner}>
          <h3>Blog baner</h3>
          <AddImage
            name="baner"
            handleImageChange={handleImageChange}
            handleImageClick={handleImageClick}
            image={image.baner}
            inputRef={inputRefBaner}
          />
        </div>
      </div>
      <div className={styles.creator__editor__action}>
        <button>
          <FaRegTrashAlt />
        </button>
        <button>Share Blog</button>
      </div>
    </div>
  );
}
