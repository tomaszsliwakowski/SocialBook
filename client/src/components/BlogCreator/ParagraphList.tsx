import { CreatorReducerType } from "../../reducers/BlogCreatorReducer";
import Paragraph from "./Paragraph";
import styles from "./blogCreator.module.css";

type PROPS = {
  ModalOn: Function;
  state: CreatorReducerType;
  changeParagraphIndex: Function;
  deleteParagraphContent: Function;
  showParagraphContent: Function;
  editParagraphContent: Function;
};

export default function ParagraphList({
  ModalOn,
  state,
  changeParagraphIndex,
  editParagraphContent,
  deleteParagraphContent,
  showParagraphContent,
}: PROPS) {
  return (
    <div className={styles.creator__editor__paragraphList}>
      <h4>Blog Content ({state.blogContent.length}/4)</h4>
      <button
        className={styles.creator__editor__AddBtn}
        onClick={() => ModalOn()}
      >
        Add Content
      </button>
      <ul>
        {state.blogContent.map((item, id) => (
          <Paragraph
            state={item}
            key={id}
            num={id}
            changeParagraphIndex={changeParagraphIndex}
            editParagraphContent={editParagraphContent}
            showParagraphContent={showParagraphContent}
            deleteParagraphContent={deleteParagraphContent}
          />
        ))}
      </ul>
    </div>
  );
}
