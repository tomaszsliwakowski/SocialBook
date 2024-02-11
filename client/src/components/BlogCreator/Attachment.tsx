import { useContext, useRef } from "react";
import styles from "./blogCreator.module.css";
import { FaRegTrashAlt } from "react-icons/fa";
import AddImage from "./AddImage";
import {
  Action,
  ActionType,
  CreatorReducerType,
} from "../../reducers/BlogCreatorReducer";
import uploadBlogImages, {
  ImagesDataType,
} from "../../assets/UploadBlogImages";
import UploadBlogDataConstructor, {
  CreatorDataType,
} from "../../assets/UploadBlogDataConstructor";
import { AuthContext, UserAuth } from "../../context/Auth";

type PROPS = {
  state: CreatorReducerType;
  dispatch: React.Dispatch<Action>;
};

export type UploadedDataType =
  | {
      baner: string;
      miniature: string;
      paragraphsImages: ImagesDataType[];
    }
  | undefined;

export default function Attachment({ state, dispatch }: PROPS) {
  const { User }: UserAuth = useContext(AuthContext);
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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    DeleteImage(e.target.name);
    if (e.target.files) {
      if (!e.target.files[0]) return;
      if (e.target.files[0].size > 2097152) {
        alert("File is too big!");
        return DeleteImage(e.target.name);
      }
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("file", file);
      if (e.target.name === "baner") {
        dispatch({
          type: ActionType.CHANGE_BANER,
          payload: formData,
        });
      }
      if (e.target.name === "miniature") {
        dispatch({
          type: ActionType.CHANGE_MINIATURE,
          payload: formData,
        });
      }
    }
  };

  const DeleteImage = (name: string): void => {
    if (name === "miniature") {
      dispatch({
        type: ActionType.CHANGE_MINIATURE,
        payload: null,
      });
    }
    if (name === "baner") {
      dispatch({
        type: ActionType.CHANGE_BANER,
        payload: null,
      });
    }
  };

  const clearReducer = (): void => {
    dispatch({
      type: ActionType.CLEAR_STATE,
      payload: "",
    });
    const refBaner = inputRefBaner.current;
    const refMiniature = inputRefMiniature.current;
    if (refBaner && refBaner.value !== "") {
      refBaner.value = "";
    }
    if (refMiniature && refMiniature.value !== "") {
      refMiniature.value = "";
    }
  };

  const UploadBlog = async () => {
    //start loading
    const stateValues = Object.values(state);
    const checkEmpty =
      stateValues.filter((item) => {
        if (typeof item === "string" && item !== "") {
          return item;
        } else if (state.blogContent.length > 0) {
          return item;
        }
      }).length === 0;
    if (checkEmpty) return;
    const uploadedImages: UploadedDataType = await uploadBlogImages(state);
    const creatorUploadData: CreatorDataType | undefined =
      await UploadBlogDataConstructor(state, uploadedImages, User.id);
    if (!creatorUploadData) return;

    //end loading
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
            image={state.miniature}
            inputRef={inputRefMiniature}
          />
        </div>
        <div className={styles.creator__editor__mainBaner}>
          <h3>Blog baner</h3>
          <AddImage
            name="baner"
            handleImageChange={handleImageChange}
            handleImageClick={handleImageClick}
            image={state.baner}
            inputRef={inputRefBaner}
          />
        </div>
      </div>
      <div className={styles.creator__editor__action}>
        <button onClick={() => clearReducer()}>
          <FaRegTrashAlt />
        </button>
        <button onClick={() => UploadBlog()}>Share Blog</button>
      </div>
    </div>
  );
}
