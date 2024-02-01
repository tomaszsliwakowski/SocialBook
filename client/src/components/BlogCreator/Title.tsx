import { useEffect, useState } from "react";
import { Action, ActionType } from "../../reducers/BlogCreatorReducer";
import styles from "./blogCreator.module.css";
import { useDebounce } from "../../hooks/useDebounce";

type PROPS = {
  dispatch: React.Dispatch<Action>;
};

export default function Title({ dispatch }: PROPS) {
  const [titleState, setTitleState] = useState("");
  const debouncedTitle = useDebounce(titleState, 2000);
  const handleTitleChange = (content: string) => {
    dispatch({ type: ActionType.CHANGE_TITLE, payload: content });
  };
  useEffect(() => {
    handleTitleChange(debouncedTitle);
  }, [debouncedTitle]);

  return (
    <div className={styles.creator__editor__title}>
      <h3>Title</h3>
      <input
        type="text"
        placeholder="Blog title"
        value={titleState}
        onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
          setTitleState(e.target.value);
          handleTitleChange(e.target.value);
        }}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setTitleState(e.target.value)
        }
      />
    </div>
  );
}
