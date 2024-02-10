import { useEffect, useState } from "react";
import { ParagraphType } from "../../../../reducers/BlogCreatorReducer";
import styles from "../../blogCreator.module.css";

type PROPS = {
  paragraph: ParagraphType;
};

export default function ShowImage({ paragraph }: PROPS) {
  const [images, setImages] = useState<string[]>([]);
  const { image_0, image_1, image_2, image_3 } = paragraph;
  const formDataImages = [image_0, image_1, image_2, image_3];

  useEffect(() => {
    if (
      Object.values(formDataImages).filter(
        (item) => typeof item !== "undefined"
      ).length > 0
    ) {
      formDataImages.forEach((item) => {
        if (item) {
          const file = item.get("file") as File;
          if (file) {
            const fileUrl = URL.createObjectURL(file);
            setImages((prev) =>
              prev.length === 0 ? [fileUrl] : [...prev, fileUrl]
            );
          }
        }
      });
    }
  }, [paragraph]);

  return (
    <div className={styles.showParagraphBody__contentImages}>
      {images.map((item, id) =>
        item ? <Image key={id} src={item} alt="Content Image" /> : null
      )}
    </div>
  );
}

type PROPS_IMAGE = {
  src: string;
  alt: string;
};

const Image = ({ src, alt }: PROPS_IMAGE) => {
  return <img src={src} alt={alt} />;
};
