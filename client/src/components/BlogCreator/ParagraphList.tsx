import { CreatorReducerType } from "../../reducers/BlogCreatorReducer";
import Paragraph from "./Paragraph";
import styles from "./blogCreator.module.css";

type PROPS = {
  ModalOn: Function;
  state: CreatorReducerType;
};

export default function ParagraphList({ ModalOn, state }: PROPS) {
  return (
    <div className={styles.creator__editor__paragraphList}>
      <h4>Blog Content (3/4)</h4>
      <button
        className={styles.creator__editor__AddBtn}
        onClick={() => ModalOn()}
      >
        Add Content
      </button>
      <ul>
        <Paragraph state={state} />
      </ul>
    </div>
  );
}
