import { ParagraphType } from "../../../../reducers/BlogCreatorReducer";
import styles from "../../blogCreator.module.css";

type PROPS = {
  paragraph: ParagraphType;
};

export default function ShowTextAndImage({ paragraph }: PROPS) {
  const content = paragraph.content;
  const { image_0 } = paragraph;

  return (
    <>
      <div
        dangerouslySetInnerHTML={{ __html: content ? content : "" }}
        className={styles.showParagraphBody__contentText}
      ></div>
      <div className={styles.showParagraphBody__contentImage}>
        {image_0 ? <img src={image_0} alt="Content Image" /> : null}
      </div>
    </>
  );
}
