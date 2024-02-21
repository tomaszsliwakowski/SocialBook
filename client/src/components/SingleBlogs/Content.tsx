import BlogImage from "./BlogImage";
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
            <BlogImage
              key={id}
              image={image}
              width="fit-content"
              alt="Paragraph image"
            />
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
      {paragraph.images ? (
        <BlogImage
          image={paragraph.images[0]}
          alt="Paragraph image"
          width="fit-content"
        />
      ) : null}
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
