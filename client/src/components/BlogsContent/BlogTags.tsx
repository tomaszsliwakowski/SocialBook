import styles from "./blogs.module.css";

type PROPS = {
  tags: string;
};

export default function BlogTags({ tags }: PROPS) {
  return (
    <div className={styles.blogs__content__tag}>
      {JSON.parse(tags).map((item: string, id: number) => (
        <span key={id}>{item}</span>
      ))}
    </div>
  );
}
