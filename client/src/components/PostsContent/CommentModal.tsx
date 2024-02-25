import { ComStateStatusType, CommentType } from "./Comments";
import styles from "./posts.module.css";
import { SlOptionsVertical } from "react-icons/sl";

type PROPS = {
  comment: CommentType;
  handleComAction: Function;
  handelDeleteComment: Function;
  comAction: ComStateStatusType;
};

export default function CommentModal({
  handelDeleteComment,
  handleComAction,
  comAction,
  comment,
}: PROPS) {
  return (
    <div id="ComModal" className={styles.comSet}>
      <SlOptionsVertical
        id="ComModal"
        onClick={() => handleComAction(comment.com_id)}
      />
      {comAction.active && comAction.comId === comment.com_id ? (
        <div className={styles.comSet__opt} id="ComModal">
          <div id="ComModal" onClick={() => handelDeleteComment()}>
            Delete
          </div>
        </div>
      ) : null}
    </div>
  );
}
