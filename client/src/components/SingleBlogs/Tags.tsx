import styles from "./blog.module.css";

type PROPS = {
  tags: string;
};

export default function Tags({ tags }: PROPS) {
  const tagsList: string[] = JSON.parse(tags);
  return (
    <div className={styles.blog__tags}>
      <ul>
        {tagsList.map((tag: string, num: number) => (
          <li key={num}>{tag}</li>
        ))}
      </ul>
    </div>
  );
}
