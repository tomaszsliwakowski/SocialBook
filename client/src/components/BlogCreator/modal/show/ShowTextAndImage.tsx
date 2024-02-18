import { useEffect, useState } from "react";
import { ParagraphType } from "../../../../reducers/BlogCreatorReducer";
import styles from "../../blogCreator.module.css";

type PROPS = {
  paragraph: ParagraphType;
};

export default function ShowTextAndImage({ paragraph }: PROPS) {
  const [image, setImage] = useState<string>("");
  const content = paragraph.content;
  const { image_0 } = paragraph;
  useEffect(() => {
    if (!image_0) return;
    const file = image_0.get("file") as File;
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setImage(fileUrl);
    }
  }, [paragraph]);
  return (
    <>
      <div
        dangerouslySetInnerHTML={{ __html: content ? content : "" }}
        className={styles.showParagraphBody__contentText}
      ></div>
      <div className={styles.showParagraphBody__contentImage}>
        {image_0 ? <img src={image} alt="Content Image" /> : null}
      </div>
    </>
  );
}
