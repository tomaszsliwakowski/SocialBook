import { useState } from "react";
import CommentsModalContent from "./CommentsModalContent";
import CommentsModalHeader from "./CommentsModalHeader";
import styles from "./blog.module.css";
import CommentsModalAction from "./CommentsModalAction";

type PROPS = {
  closeModalAfterClickOtherSite: Function;
  modalStatusHandler: Function;
};

export default function CommentsModal({
  closeModalAfterClickOtherSite,
  modalStatusHandler,
}: PROPS) {
  const [commentText, setCommentText] = useState<string>("");

  const handleCommentText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCommentText(e.target.value);
  };

  const shareComment = () => {};

  return (
    <div
      id="modal"
      onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
        closeModalAfterClickOtherSite(e)
      }
      className={styles.blog__comments__modal}
    >
      <div className={styles.blog__comments__modal__body}>
        <CommentsModalHeader modalStatusHandler={modalStatusHandler} />
        <CommentsModalContent
          commentText={commentText}
          handleCommentText={handleCommentText}
        />
        <CommentsModalAction
          shareDisable={commentText === ""}
          shareComment={shareComment}
        />
      </div>
    </div>
  );
}
