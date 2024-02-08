import styles from "../../blogCreator.module.css";

type PROPS = {
  content: string | undefined;
};

export default function ShowText({ content }: PROPS) {
  return (
    <div
      dangerouslySetInnerHTML={{ __html: content ? content : "" }}
      className={styles.showParagraphBody__content}
    ></div>
  );
}
