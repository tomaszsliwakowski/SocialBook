import { useEffect, useState } from "react";
import Attachment from "./Attachment";
import ParagraphList from "./ParagraphList";
import Tags from "./Tags";
import Title from "./Title";
import styles from "./blogCreator.module.css";
import ParagraphType from "./ParagraphType";

export default function Main() {
  const [contentModalStatus, setContentModalStatus] = useState(true);

  useEffect(() => {
    if (!contentModalStatus) return;
    const parent = document.querySelector("body");
    const documentWidth = document.documentElement.clientWidth;
    const scrollbarWidth = Math.abs(window.innerWidth - documentWidth);
    if (parent) {
      parent.style.overflow = "hidden";
      parent.style.paddingRight = `${scrollbarWidth}px`;
    }
    return () => {
      if (parent) {
        parent.style.overflow = "auto";
        parent.style.paddingRight = "0px";
      }
    };
  }, [contentModalStatus]);

  const closeModal = (e: React.MouseEvent) => {
    let target = e.target as HTMLElement;
    if (target.id === "modal" || target.id === "modalBtn") {
      setContentModalStatus(false);
    }
  };

  return (
    <>
      <div className={styles.creator__main}>
        <h2>Blog Creator</h2>
        <div className={styles.creator__editor}>
          <div className={styles.creator__editor__content}>
            <Title />
            <ParagraphList />
            <Tags />
          </div>
          <Attachment />
        </div>
      </div>
      {contentModalStatus ? (
        <div
          id="modal"
          onClick={(e) => closeModal(e)}
          className={styles.contentModal}
        >
          <div className={styles.contentModal__body}>
            <div className={styles.contentModal__body__head}>
              <h2>Blog Content</h2>
            </div>
            <ParagraphType closeModal={closeModal} />
          </div>
        </div>
      ) : null}
    </>
  );
}
