import { BlogTypeProps } from "./BlogTypes";
import styles from "./blogs.module.css";

interface PROPS extends BlogTypeProps {
  name: string;
}

export default function BlogsType({
  typeShow,
  selectBlogsAction,
  name,
}: PROPS) {
  return (
    <span
      className={`${
        typeShow === name
          ? styles.blogs__types__active
          : styles.blogs__types__none
      }`}
      onClick={() => selectBlogsAction("type", name)}
    >
      {name}
    </span>
  );
}
