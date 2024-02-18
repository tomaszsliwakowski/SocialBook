import styles from "./blog.module.css";

type PROPS = {
  title: string;
};

export default function Title({ title }: PROPS) {
  return (
    <div className={styles.blog__top__title}>
      <h2>{title}</h2>
    </div>
  );
}
