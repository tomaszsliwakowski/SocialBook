import styles from "../../blogCreator.module.css";
import JoditEditor from "jodit-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useDebounce } from "../../../../hooks/useDebounce";
import { EditorContentType } from "../../Main";

type PROPS = {
  theme: string;
  editorContentHandler: Function;
  state: EditorContentType | undefined;
};

export default function TextEditor({
  theme,
  editorContentHandler,
  state,
}: PROPS) {
  const editor = useRef(null);
  const [content, setContent] = useState(state?.content || "");
  const debouncedContent = useDebounce(content, 3000);

  const config = useMemo(
    () => ({
      placeholder: "Start typings...",
      theme: theme,
    }),
    [theme]
  );

  useEffect(() => {
    editorContentHandler(debouncedContent);
  }, [debouncedContent]);

  return (
    <div className={styles.contentModal__textEditor}>
      <JoditEditor
        ref={editor}
        value={content}
        config={config}
        onBlur={(newContent) => {
          setContent(newContent), editorContentHandler(content);
        }}
        onChange={(newContent) => setContent(newContent)}
      />
    </div>
  );
}
