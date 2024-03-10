import styles from "./blogs.module.css";

type BlogContentType = {
  id: string;
  type: string;
  content: string | undefined;
  images?: string[];
};

type PROPS = {
  title: string;
  blogContent: string;
};

export default function BlogDesc({ title, blogContent }: PROPS) {
  return (
    <div className={styles.blogs__content__desc}>
      <h2>{title}</h2>
      <div
        dangerouslySetInnerHTML={{
          __html: JSON.parse(blogContent).filter(
            (item: BlogContentType) => item.type === "Text"
          )[0].content,
        }}
      ></div>
    </div>
  );
}
