import styles from "../../blogCreator.module.css";
import ImageContent from "./ImageContent";

export default function ImageContentCreator() {
  return (
    <div className={styles.contentModal__ImagesContent}>
      <ImageContent />
      <ImageContent />
      <ImageContent />
      <ImageContent />
    </div>
  );
}
