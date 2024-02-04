import { ReactNode } from "react";
import styles from "./blogCreator.module.css";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className={styles.creator__main}>
      <h2>Blog Creator</h2>
      <div className={styles.creator__editor}>{children}</div>
    </div>
  );
}
