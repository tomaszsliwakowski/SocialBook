import { SlOptionsVertical } from "react-icons/sl";
import styles from "./posts.module.css";
import { PostStateStatusType } from "./Post";

type PROPS = {
  actionPostOff: Function;
  handleDeletePost: Function;
  postAction: PostStateStatusType;
  postId: string;
};

export default function PostModal({
  actionPostOff,
  postAction,
  handleDeletePost,
  postId,
}: PROPS) {
  return (
    <div
      className={`${
        postAction.active && postAction.postId === postId
          ? styles.postSetActive
          : styles.postSet
      }`}
      id="modal"
    >
      <SlOptionsVertical id="modal" onClick={() => actionPostOff()} />
      {postAction.active ? (
        <div className={styles.postSet__opt} id="modal">
          <div id="modal" onClick={() => handleDeletePost()}>
            Delete
          </div>
        </div>
      ) : null}
    </div>
  );
}
