import { BiUser } from "react-icons/bi";
import styles from "./posts.module.css";

type PROPS = {
  comValue: string;
  writeComment: Function;
  addComment: Function;
};

export default function AddComment({
  comValue,
  writeComment,
  addComment,
}: PROPS) {
  return (
    <div className={styles.addComment}>
      <div>
        <BiUser />
      </div>
      <div>
        <textarea
          value={comValue}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            writeComment(e)
          }
          maxLength={250}
          placeholder="Write a comment"
        ></textarea>
      </div>
      <div>
        <button onClick={() => addComment()}>Share</button>
      </div>
    </div>
  );
}
