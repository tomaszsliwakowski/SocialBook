import { useRef } from "react";
import styles from "./blogCreator.module.css";
import { FaRegTrashAlt } from "react-icons/fa";
import AddImage from "./AddImage";
import {
  Action,
  ActionType,
  CreatorReducerType,
} from "../../reducers/BlogCreatorReducer";

type PROPS = {
  state: CreatorReducerType;
  dispatch: React.Dispatch<Action>;
};

export default function Attachment({ state, dispatch }: PROPS) {
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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    DeleteImage(e.target.name);
    if (e.target.files) {
      if (!e.target.files[0]) return;
      if (e.target.files[0].size > 2097152) {
        alert("File is too big!");
        return DeleteImage(e.target.name);
      }
      const file = e.target.files[0];
      const redData = new FileReader();
      redData.readAsDataURL(file);
      redData.onload = () => {
        if (typeof redData.result === "string") {
          if (e.target.name === "baner") {
            dispatch({
              type: ActionType.CHANGE_BANER,
              payload: redData.result,
            });
          }
          if (e.target.name === "miniature") {
            dispatch({
              type: ActionType.CHANGE_MINIATURE,
              payload: redData.result,
            });
          }
        }
      };
    }
  };

  const DeleteImage = (name: string): void => {
    if (name === "miniature") {
      dispatch({
        type: ActionType.CHANGE_MINIATURE,
        payload: "",
      });
    }
    if (name === "baner") {
      dispatch({
        type: ActionType.CHANGE_BANER,
        payload: "",
      });
    }
  };

  const clearReducer = () => {
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
        <button>Share Blog</button>
      </div>
    </div>
  );
}
