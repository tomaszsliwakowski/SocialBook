import { useEffect, useState } from "react";
import Menu from "./Menu";
import Posts from "./Posts";
import styles from "./posts.module.css";
import AddPost from "./AddPost";

export default function Main() {
  const [addPostModal, setAddPostModal] = useState(false);

  useEffect(() => {
    const parent = document.querySelector("body");
    const documentWidth = document.documentElement.clientWidth;
    const scrollbarWidth = Math.abs(window.innerWidth - documentWidth);
    if (parent && addPostModal) {
      parent.style.overflow = "hidden";
      parent.style.paddingRight = `${scrollbarWidth}px`;
    }
    return () => {
      if (parent) {
        parent.style.overflow = "auto";
        parent.style.paddingRight = "0px";
      }
    };
  }, [addPostModal]);

  const closeModal = (e: React.MouseEvent) => {
    let target = e.target as HTMLElement;
    if (target.id === "modal") {
      setAddPostModal(false);
    }
  };

  return (
    <>
      <div className={styles.posts}>
        <Menu setAddPostModal={setAddPostModal} />
        <Posts />
      </div>
      {addPostModal ? (
        <div
          id="modal"
          className={styles.posts__addPost}
          onClick={(e) => closeModal(e)}
        >
          <AddPost />
        </div>
      ) : null}
    </>
  );
}
