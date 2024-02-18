import styles from "./blog.module.css";

type PROPS = {
  paragraphs: string;
};

type ParagraphsType = {
  id: string;
  type: string;
  content?: string | undefined;
  images?: string[];
};

export default function Content({ paragraphs }: PROPS) {
  const paragraphsList: ParagraphsType[] = JSON.parse(paragraphs);

  return (
    <div className={styles.blog__content}>
      {paragraphsList.map((paragraph, num) => (
        <div key={num}>
          {paragraph.type === "Text" ? (
            <TextParagraph paragraph={paragraph} />
          ) : null}
          {paragraph.type === "TextAndImage" ? (
            <TextAndImageParagraph paragraph={paragraph} />
          ) : null}
          {paragraph.type === "Image" ? (
            <ImagesParagraph paragraph={paragraph} />
          ) : null}
        </div>
      ))}
    </div>
  );
}

const ImagesParagraph = ({ paragraph }: { paragraph: ParagraphsType }) => {
  return (
    <div className={styles.blog__content__paragraph_img}>
      {paragraph.images
        ? paragraph.images.map((image, id) => (
            <img key={id} src={image} alt="image" />
          ))
        : null}
    </div>
  );
};
const TextAndImageParagraph = ({
  paragraph,
}: {
  paragraph: ParagraphsType;
}) => {
  return (
    <div className={styles.blog__content__paragraph_img}>
      <div
        dangerouslySetInnerHTML={{
          __html: paragraph.content ? paragraph.content : "",
        }}
      ></div>
      {paragraph.images ? <img src={paragraph.images[0]} alt="image" /> : null}
    </div>
  );
};
const TextParagraph = ({ paragraph }: { paragraph: ParagraphsType }) => {
  return (
    <div className={styles.blog__content__paragraph}>
      <div
        dangerouslySetInnerHTML={{
          __html: paragraph.content ? paragraph.content : "",
        }}
      ></div>
    </div>
  );
};
