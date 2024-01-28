import { useContext, useEffect, useReducer, useState } from "react";
import Attachment from "./Attachment";
import ParagraphList from "./ParagraphList";
import Tags from "./Tags";
import Title from "./Title";
import styles from "./blogCreator.module.css";
import ParagraphType from "./modal/type/ParagraphType";
import ModalBody from "./modal/ModalBody";
import {
  CreatorReducer,
  initialState,
} from "../../reducers/BlogCreatorReducer";
import ParagraphContent from "./modal/content/ParagraphContent";
import { ThemeContext } from "../../context/ThemeContext";

export default function Main() {
  const { theme } = useContext(ThemeContext);
  const [contentModalStatus, setContentModalStatus] = useState(false);
  const [selectedParagraph, setSelectedParagraph] = useState<string>("Text");
  const [editorContent, setEditorContent] = useState<string>("");
  const [modalStep, setModalStep] = useState<number>(0);
  const [state, dispatch] = useReducer(CreatorReducer, initialState);

  useEffect(() => {
    if (!contentModalStatus) return;
    const parent = document.querySelector("body");
    if (parent) {
      parent.classList.add("scrollOff" + theme);
    }
    return () => {
      if (parent) {
        parent.classList.remove("scrollOff" + theme);
      }
    };
  }, [contentModalStatus]);

  const closeModal = (e: React.MouseEvent) => {
    let target = e.target as HTMLElement;
    if (target.id === "modal" || target.id === "modalBtn") {
      setContentModalStatus(false);
    }
  };

  const paragraphContentHandler = () => {
    //add to reducer
  };

  const selectParagraphHandler = (type: string) => {
    setSelectedParagraph(type);
  };
  const modalOff = () => {
    setContentModalStatus(false);
  };
  const modalOn = () => {
    setContentModalStatus(true);
  };
  const modalNextStep = () => {
    setModalStep((prev) => prev + 1);
  };
  const modalBackStep = () => {
    setModalStep((prev) => prev - 1);
  };

  const modalSetStep = (action: string) => {
    switch (action) {
      case "next":
        modalNextStep();
        break;
      case "back":
        modalBackStep();
        break;
      case "sub":
        paragraphContentHandler();
        break;
      case "off":
        modalOff();
        break;
      default:
        break;
    }
  };

  const editorContentHandler = (content: string) => {
    setEditorContent(content);
  };

  return (
    <>
      <div className={styles.creator__main}>
        <h2>Blog Creator</h2>
        <div className={styles.creator__editor}>
          <div className={styles.creator__editor__content}>
            <Title state={state} dispatch={dispatch} />
            <ParagraphList ModalOn={modalOn} state={state} />
            <Tags state={state} dispatch={dispatch} />
          </div>
          <Attachment state={state} dispatch={dispatch} />
        </div>
      </div>
      {contentModalStatus ? (
        <ModalBody
          closeModal={closeModal}
          id="modal"
          title="Blog Content"
          modalStep={modalStep}
        >
          {modalStep === 0 ? (
            <ParagraphType
              selectedParagraph={selectedParagraph}
              selectParagraphHandler={selectParagraphHandler}
              setModalStep={modalSetStep}
            />
          ) : null}
          {modalStep === 1 ? (
            <ParagraphContent
              setModalStep={modalSetStep}
              selectedParagraph={selectedParagraph}
              theme={theme}
              editorContentHandler={editorContentHandler}
            />
          ) : null}
        </ModalBody>
      ) : null}
    </>
  );
}
