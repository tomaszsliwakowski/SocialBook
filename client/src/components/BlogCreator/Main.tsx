import { useEffect, useReducer, useState } from "react";
import Attachment from "./Attachment";
import ParagraphList from "./ParagraphList";
import Tags from "./Tags";
import Title from "./Title";
import styles from "./blogCreator.module.css";
import ParagraphType from "./modal/ParagraphType";
import ModalBody from "./modal/ModalBody";
import {
  CreatorReducer,
  initialState,
} from "../../reducers/BlogCreatorReducer";

export default function Main() {
  const [contentModalStatus, setContentModalStatus] = useState(false);
  const [selectedParagraph, setSelectedParagraph] = useState<string>("");
  const [state, dispatch] = useReducer(CreatorReducer, initialState);

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
  const ModalOff = () => {
    setContentModalStatus(false);
  };
  const ModalOn = () => {
    setContentModalStatus(true);
  };

  return (
    <>
      <div className={styles.creator__main}>
        <h2>Blog Creator</h2>
        <div className={styles.creator__editor}>
          <div className={styles.creator__editor__content}>
            <Title state={state} dispatch={dispatch} />
            <ParagraphList ModalOn={ModalOn} state={state} />
            <Tags state={state} dispatch={dispatch} />
          </div>
          <Attachment state={state} dispatch={dispatch} />
        </div>
      </div>
      {contentModalStatus ? (
        <ModalBody closeModal={closeModal} id="modal" title="Blog Content">
          <ParagraphType
            ModalOff={ModalOff}
            selectedParagraph={selectedParagraph}
            SelectParagraphHandler={SelectParagraphHandler}
            dispatch={dispatch}
          />
        </ModalBody>
      ) : null}
    </>
  );
}
