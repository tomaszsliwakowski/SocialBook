import { Link } from "react-router-dom";
import styles from "./footer.module.css";
import { AiOutlineCopyrightCircle } from "react-icons/ai";
import {
  BLOGS_ROUTE,
  CHATS_ROUTE,
  HOME_ROUTE,
  POSTS_ROUTE,
} from "../../routes";

export default function Footer() {
  return (
    <div className={styles.footer}>
      <div>
        <div className={styles.footer__info}>
          <div className={styles.footer__logo}>
            <a href="/">
              <strong>S</strong>ocial<strong>B</strong>ook
            </a>
          </div>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus
            libero qui beatae, repellendus fugit modi aspernatur, enim quae
            temporibus officiis ducimus porro in fuga eaque iure, recusandae
            sunt animi corporis.
          </p>
        </div>
        <div className={styles.footer__nav}>
          <div>
            <strong>Links</strong>
            <Link to={HOME_ROUTE}>Start</Link>
            <Link to={POSTS_ROUTE}>Posts</Link>
            <Link to={BLOGS_ROUTE}>Blogs</Link>
            <Link to={CHATS_ROUTE}>Chats</Link>
          </div>
          <div>
            <strong>Tags</strong>
            <Link to={"/"}>Food</Link>
            <Link to={"/"}>Travel</Link>
            <Link to={"/"}>Cars</Link>
            <Link to={"/"}>Sports</Link>
          </div>
        </div>
      </div>
      <div className={styles.copyright}>
        <span>
          <p>Copyright</p>
          <AiOutlineCopyrightCircle />
          <p>{new Date().getFullYear()}</p>
        </span>
      </div>
    </div>
  );
}
