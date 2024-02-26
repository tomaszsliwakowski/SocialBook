import { useContext, useEffect, useState } from "react";
import Comments from "./Comments";
import CommentsCreator from "./CommentsCreator";
import CommentsHead from "./CommentsHead";
import styles from "./blog.module.css";
import CommentsModal from "./CommentsModal";
import { ThemeContext } from "../../context/ThemeContext";

export default function CommentsSection() {
  const { theme } = useContext(ThemeContext);
  const [modalStatus, setModalStatus] = useState(false);

  useEffect(() => {
    if (!modalStatus) return;
    const parent = document.querySelector("body");
    if (parent) {
      parent.classList.add("scrollOff" + theme);
    }
    return () => {
      if (parent) {
        parent.classList.remove("scrollOff" + theme);
      }
    };
  }, [modalStatus]);

  const closeModalAfterClickOtherSite = (e: React.MouseEvent) => {
    let target = e.target as HTMLElement;
    if (target.id === "modal") {
      setModalStatus(false);
    }
  };
  const modalStatusHandler = (action: boolean) => {
    setModalStatus(action);
  };

  return (
    <>
      <div className={styles.blog__comments} id="comments">
        <div className={styles.blog__comments__container}>
          <CommentsHead />
          <CommentsCreator modalStatusHandler={modalStatusHandler} />
        </div>
        <Comments />
      </div>
      {modalStatus ? (
        <CommentsModal
          closeModalAfterClickOtherSite={closeModalAfterClickOtherSite}
          modalStatusHandler={modalStatusHandler}
        />
      ) : null}
    </>
  );
}
