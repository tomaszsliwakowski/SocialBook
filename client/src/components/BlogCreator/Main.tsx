import { useEffect, useReducer, useState } from "react";
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
import { scrollDisable } from "../../assets/assets";

export default function Main() {
  const [contentModalStatus, setContentModalStatus] = useState(false);
  const [selectedParagraph, setSelectedParagraph] = useState<string>("Text");
  const [modalStep, setModalStep] = useState<number>(0);
  const [state, dispatch] = useReducer(CreatorReducer, initialState);

  useEffect(() => {
    scrollDisable(contentModalStatus);
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

  const SetModalStep = (action: string) => {
    setModalStep((prev) =>
      action === "next" ? prev + 1 : action === "back" ? prev - 1 : 0
    );
    if (action === "sub") {
      setContentModalStatus(false);
    }
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
          {modalStep === 0 ? (
            <ParagraphType
              ModalOff={ModalOff}
              selectedParagraph={selectedParagraph}
              SelectParagraphHandler={SelectParagraphHandler}
              SetModalStep={SetModalStep}
            />
          ) : null}
          {modalStep === 1 ? (
            <ParagraphContent
              SetModalStep={SetModalStep}
              selectedParagraph={selectedParagraph}
            />
          ) : null}
        </ModalBody>
      ) : null}
    </>
  );
}
