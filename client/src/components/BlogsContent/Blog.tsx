import { useState } from "react";
import { timeExpiredFrom } from "../../assets/assets";
import styles from "./blogs.module.css";
import { BiUser } from "react-icons/bi";
import { BsBookmarks } from "react-icons/bs";
import { BsBookmarksFill } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";
import { FaRegCommentAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { BlogRouteBuilder } from "../../routes";
import { BlogsType } from "./Main";

type StateStatusType = {
  postId: string;
  active: boolean;
};

type PROPS = {
  blog: BlogsType;
};

type BlogContentType = {
  id: string;
  type: string;
  content: string | undefined;
  images?: string[];
};

export default function Blog({ blog }: PROPS) {
  const [saveStatus, setSaveStatus] = useState(false);
  const [sub, setSub] = useState<StateStatusType>({
    postId: "",
    active: false,
  });

  return (
    <li className={styles.blogs__content__element}>
      <Link
        to={BlogRouteBuilder(blog.id)}
        className={styles.blogs__content__image}
      >
        <img src={blog.miniature} alt="miniature" />
        <div className={styles.blogs__content__react}>
          <span>
            <AiOutlineHeart />
            {blog.likes}
          </span>
          <span>
            <FaRegCommentAlt />
            {blog.comments}
          </span>
        </div>
      </Link>
      <div className={styles.blogs__content__tag}>
        {JSON.parse(blog.tags).map((item: string, id: number) => (
          <span key={id}>{item}</span>
        ))}
      </div>
      <div className={styles.blogs__content__desc}>
        <h2>{blog.title}</h2>
        <div
          dangerouslySetInnerHTML={{
            __html: JSON.parse(blog.blogContent).filter(
              (item: BlogContentType) => item.type === "Text"
            )[0].content,
          }}
        ></div>
      </div>
      <div className={styles.blogs__content__info}>
        <div className={styles.blogs__content__user}>
          <div>
            <BiUser />
          </div>
          <div>
            <div className={styles.blogs__content__userInfo}>
              <span>{blog.userName}</span>
              {blog.userName !== "" ? (
                true ? (
                  <button>Follow</button>
                ) : null
              ) : null}
            </div>
            <span className={styles.blogs__content__createTime}>
              {timeExpiredFrom(blog.createdAt)}
            </span>
          </div>
        </div>
        <div className={styles.blogs__content__save}>
          {saveStatus ? (
            <BsBookmarksFill onClick={() => setSaveStatus(false)} />
          ) : (
            <BsBookmarks onClick={() => setSaveStatus(true)} />
          )}
        </div>
      </div>
    </li>
  );
}
