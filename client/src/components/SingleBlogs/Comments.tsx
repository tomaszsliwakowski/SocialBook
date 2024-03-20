import { useEffect, useState } from "react";
import { UserType } from "../../context/Auth";
import { ComStateStatusType } from "../PostsContent/Comments";
import styles from "./blog.module.css";
import Comment from "./Comment";
import { BlogCommentType } from "./CommentsSection";

type PROPS = {
  comments: BlogCommentType[];
  User: UserType;
};

export default function Comments({ comments, User }: PROPS) {
  const [comAction, setComAction] = useState<ComStateStatusType>({
    comId: "",
    active: false,
  });

  const handleComAction = (id: string, active: boolean = true) => {
    setComAction({ comId: id, active: active });
  };

  useEffect(() => {
    if (!comAction.active) return;
    const parent = document.querySelector("body");

    function closeModal(e: Event) {
      let target = e.target as HTMLElement;
      if (target.id !== "ComModal") {
        setComAction({ active: false, comId: "" });
      }
    }

    if (parent) {
      parent.addEventListener("click", closeModal);
    }
    return () => {
      if (parent) {
        parent.removeEventListener("click", closeModal);
      }
    };
  }, [comAction.active]);

  return (
    <div className={styles.blog__comments__content}>
      {comments.length !== 0 ? (
        <ul>
          {comments.map((item, id) => (
            <Comment
              key={id}
              comment={item}
              User={User}
              handleComAction={handleComAction}
              comAction={comAction}
            />
          ))}
        </ul>
      ) : (
        <div className={styles.blog__comments__empty}>
          There are no comments
        </div>
      )}
    </div>
  );
}
