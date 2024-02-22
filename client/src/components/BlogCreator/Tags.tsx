import { useState } from "react";
import { PopularTagsCreator } from "../../assets/Library";
import SelectBarCreator from "./SelectBarCreator";
import styles from "./blogCreator.module.css";
import { IoMdAdd } from "react-icons/io";
import Tag from "./Tag";
import {
  Action,
  ActionType,
  CreatorReducerType,
} from "../../reducers/BlogCreatorReducer";

type PROPS = {
  state: CreatorReducerType;
  dispatch: React.Dispatch<Action>;
};

export default function Tags({ state, dispatch }: PROPS) {
  const [enterTagValue, setEnterTagValue] = useState<string>("");

  const selectTagsHandler = (item: string): void => {
    if (state.tags.includes(item)) {
      dispatch({ type: ActionType.DELETE_TAG, payload: item });
    } else {
      dispatch({ type: ActionType.ADD_TAG, payload: item });
    }
  };

  const deleteSelectedTag = (item: string): void => {
    dispatch({ type: ActionType.DELETE_TAG, payload: item });
  };

  const addEnterTag = (): void => {
    if (enterTagValue !== "") {
      dispatch({
        type: ActionType.ADD_TAG,
        payload: enterTagValue.charAt(0).toUpperCase() + enterTagValue.slice(1),
      });
      setEnterTagValue("");
    }
  };
  const { tags }: { tags: string[] } = state;

  return (
    <div className={styles.creator__editor__tags}>
      <h4>Tags ({state.tags.length}/10)</h4>
      <div className={styles.creator__editor__tags__selectBar}>
        <div className={styles.creator__editor__tags__selectBar__input}>
          <input
            type="text"
            placeholder="Enter Your Tag"
            value={enterTagValue}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEnterTagValue(e.target.value)
            }
          />
          <button onClick={() => addEnterTag()}>
            <IoMdAdd />
          </button>
        </div>
        <div className={styles.creator__editor__tags__selectBar__select}>
          <SelectBarCreator
            defaultValue="List of tags"
            headName="Tags"
            list={PopularTagsCreator}
            id="creatortags"
            selectTagsAction={selectTagsHandler}
            selectedTags={state.tags}
          />
        </div>
      </div>
      <div className={styles.creator__editor__tags__list}>
        <ul>
          {tags.map((item, index) => (
            <Tag
              key={index}
              name={item}
              deleteSelectedTag={deleteSelectedTag}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}
