import { ParagraphType } from "../../../../reducers/BlogCreatorReducer";
import styles from "../../blogCreator.module.css";

type PROPS = {
  paragraph: ParagraphType;
};

export default function ShowImage({ paragraph }: PROPS) {
  const { image_0, image_1, image_2, image_3 } = paragraph;
  const images = [image_0, image_1, image_2, image_3];
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
