import { Action, CreatorReducerType } from "../../reducers/BlogCreatorReducer";
import styles from "./blogCreator.module.css";

type PROPS = {
  state: CreatorReducerType;
  dispatch: React.Dispatch<Action>;
};

export default function Title({ dispatch, state }: PROPS) {
  return (
    <div className={styles.creator__editor__title}>
      <h3>Title</h3>
      <input type="text" placeholder="Blog title" />
    </div>
  );
}
