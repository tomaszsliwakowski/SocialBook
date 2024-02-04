import { CreatorReducerType } from "../../../../reducers/BlogCreatorReducer";
import { EditorContentType } from "../../Main";
import styles from "../../blogCreator.module.css";
import ImageContent from "./ImageContent";

export enum TypeImageEnum {
  image_0 = "image_0",
  image_1 = "image_1",
  image_2 = "image_2",
  image_3 = "image_3",
}

type PROPS = {
  editorContentHandler: Function;
  editorContent: EditorContentType;
};

export default function ImageContentCreator({
  editorContentHandler,
  editorContent,
}: PROPS) {
  return (
    <div className={styles.contentModal__ImagesContent}>
      <ImageContent
        editorContentHandler={editorContentHandler}
        type={TypeImageEnum.image_0}
        images={editorContent}
      />
      <ImageContent
        editorContentHandler={editorContentHandler}
        type={TypeImageEnum.image_1}
        images={editorContent}
      />
      <ImageContent
        editorContentHandler={editorContentHandler}
        type={TypeImageEnum.image_2}
        images={editorContent}
      />
      <ImageContent
        editorContentHandler={editorContentHandler}
        type={TypeImageEnum.image_3}
        images={editorContent}
      />
    </div>
  );
}
