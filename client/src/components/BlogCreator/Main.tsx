import { useContext, useEffect, useReducer, useState } from "react";
import Attachment from "./Attachment";
import ParagraphList from "./ParagraphList";
import Tags from "./Tags";
import Title from "./Title";
import styles from "./blogCreator.module.css";
import ParagraphType from "./modal/type/ParagraphType";
import ModalBody from "./modal/ModalBody";
import {
  ActionType,
  CreatorReducer,
  initialState,
} from "../../reducers/BlogCreatorReducer";
import ParagraphContent from "./modal/content/ParagraphContent";
import { ThemeContext } from "../../context/ThemeContext";
import { idGenerator } from "../../assets/assets";
import Layout from "./Layout";
import ShowParagraph from "./modal/show/ShowParagraph";

export interface ImagesContentType {
  image_0?: string;
  image_1?: string;
  image_2?: string;
  image_3?: string;
}

export interface EditorContentType extends ImagesContentType {
  content?: string;
  id?: string;
  paragraphType?: string;
}

export type ModalStateType = {
  id?: string;
  type: string;
  status: boolean;
};

export default function Main() {
  const { theme } = useContext(ThemeContext);
  const [modalStatus, setModalStatus] = useState<ModalStateType>({
    type: "",
    status: false,
  });

  const [selectedParagraph, setSelectedParagraph] = useState<string>("Text");
  const [editorContent, setEditorContent] = useState<EditorContentType>({});
  const [modalStep, setModalStep] = useState<number>(0);
  const [state, dispatch] = useReducer(CreatorReducer, initialState);

  useEffect(() => {
    if (!modalStatus.status) return;
    const parent = document.querySelector("body");
    if (parent) {
      parent.classList.add("scrollOff" + theme);
    }
    return () => {
      if (parent) {
        parent.classList.remove("scrollOff" + theme);
      }
    };
  }, [modalStatus.status]);

  const closeModal = (e: React.MouseEvent) => {
    let target = e.target as HTMLElement;
    if (target.id === "modal" || target.id === "modalBtn") {
      setModalStatus({
        id: "",
        type: "",
        status: false,
      });
    }
  };

  const paragraphContentHandler = () => {
    if (state.blogContent.length < 4) {
      if (editorContent.content === "") return;
      if (
        (selectedParagraph === "Image" &&
          Object.values(editorContent).length === 0) ||
        Object.values(editorContent).filter((item) => item !== "").length === 0
      )
        return;
      dispatch({
        type: ActionType.ADD_BLOGCONTENT,
        payload: {
          id: idGenerator(),
          paragraphType: selectedParagraph,
          ...editorContent,
        },
      });
    }
    setModalStatus({
      type: "",
      status: false,
    });
    setModalStep(0);
    setSelectedParagraph("Text");
    setEditorContent({});
  };

  const selectParagraphHandler = (type: string) => {
    setSelectedParagraph(type);
  };
  const modalOff = () => {
    setModalStatus({
      type: "",
      status: false,
    });
  };
  const modalOn = () => {
    setModalStatus({
      type: "Add",
      status: true,
    });
    setModalStep(0);
    setEditorContent({});
    setSelectedParagraph("Text");
  };
  const modalNextStep = () => {
    setModalStep((prev) => prev + 1);
  };
  const modalBackStep = () => {
    setModalStep((prev) => prev - 1);
  };

  const editParagraphHandler = () => {
    dispatch({ type: ActionType.MODIFY_BLOGCONTENT, payload: editorContent });
    setModalStatus({
      type: "",
      status: false,
    });
    setEditorContent({});
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
      case "edit":
        editParagraphHandler();
        break;
      case "off":
        modalOff();
        break;
      default:
        break;
    }
  };

  const editorContentHandler = (image: string, type: string) => {
    setEditorContent((prev) => ({ ...prev, [type]: image }));
  };
  const textContentHandler = (content: string) => {
    setEditorContent((prev) => ({ ...prev, content: content }));
  };

  const changeParagraphIndex = (id: string, action: string): void => {
    dispatch({ type: ActionType.INDEX_BLOGCONTENT, payload: { id, action } });
  };

  const editParagraphContent = (id: string) => {
    const paragraph = state.blogContent.filter((item) => item.id === id)[0];
    setEditorContent(paragraph);
    setSelectedParagraph(paragraph.paragraphType);
    setModalStep(1);
    setModalStatus({
      id: id,
      type: "Edit",
      status: true,
    });
  };
  const showParagraphContent = (id: string) => {
    setModalStatus({
      id: id,
      type: "Show",
      status: true,
    });
  };
  const deleteParagraphContent = (id: string) => {
    dispatch({ type: ActionType.DELETE_BLOGCONTENT, payload: id });
  };

  return (
    <>
      <Layout>
        <div className={styles.creator__editor__content}>
          <Title dispatch={dispatch} />
          <ParagraphList
            ModalOn={modalOn}
            state={state}
            changeParagraphIndex={changeParagraphIndex}
            editParagraphContent={editParagraphContent}
            showParagraphContent={showParagraphContent}
            deleteParagraphContent={deleteParagraphContent}
          />
          <Tags state={state} dispatch={dispatch} />
        </div>
        <Attachment state={state} dispatch={dispatch} />
      </Layout>
      {(modalStatus.status && modalStatus.type === "Add") ||
      modalStatus.type === "Edit" ? (
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
              editorContent={editorContent}
              textContentHandler={textContentHandler}
              modalStatus={modalStatus}
            />
          ) : null}
        </ModalBody>
      ) : null}
      {modalStatus.status && modalStatus.type === "Show" ? (
        <ModalBody
          closeModal={closeModal}
          id="modal"
          title="Paragraph Content"
          modalStep={1}
        >
          <ShowParagraph />
        </ModalBody>
      ) : null}
    </>
  );
}
