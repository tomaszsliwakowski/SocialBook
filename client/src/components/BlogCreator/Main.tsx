import { useEffect, useReducer, useState } from "react";
import Attachment from "./Attachment";
import ParagraphList from "./ParagraphList";
import Tags from "./Tags";
import Title from "./Title";
import styles from "./blogCreator.module.css";
import ParagraphType from "./modal/ParagraphType";
import ModalBody from "./modal/ModalBody";
import { reducer, CreatorReducerType } from "../../reducers/BlogCreatorReducer";

const initialState: CreatorReducerType = {
  title: "",
  blogContent: {},
  tags: [],
  miniature: "",
  baner: "",
};

export default function Main() {
  const [contentModalStatus, setContentModalStatus] = useState(true);
  const [selectedParagraph, setSelectedParagraph] = useState<string>("");
  const [state, dispatch] = useReducer(reducer, initialState);

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

  const SelectParagraphHandler = (type: string) => {
    setSelectedParagraph(type);
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
        <ModalBody closeModal={closeModal} id="modal" title="Blog Content">
          <ParagraphType
            closeModal={closeModal}
            selectedParagraph={selectedParagraph}
            SelectParagraphHandler={SelectParagraphHandler}
          />
        </ModalBody>
      ) : null}
    </>
  );
}
