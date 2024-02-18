import React, { useEffect, useState } from "react";
import styles from "./posts.module.css";
import { BiUser } from "react-icons/bi";
import { useMutation, useQuery } from "@apollo/client";
import { PostType } from "./Main";
import { UserType } from "../../context/Auth";
import {
  ADD_COMMENT_POST,
  DELETE_COMMENT_POST,
} from "../../mutations/postsMutations";
import { GET_COMMENTS } from "../../Query/postsQuery";
import { SlOptionsVertical } from "react-icons/sl";
import { v4 as uuidv4 } from "uuid";
import { timeExpiredFrom } from "../../assets/assets";

type PROPS = {
  postData: PostType;
  User: UserType;
  refetch: Function;
};

type CommentType = {
  post_id: string;
  user_id: string;
  username: string;
  comment_text: string;
  createdAt: string;
  com_id: string;
};
type StateStatusType = {
  comId: string;
  active: boolean;
};

export default function Comments({ postData, User, refetch }: PROPS) {
  const [comValue, setComValue] = useState("");
  const [comments, setComments] = useState<CommentType[]>([]);
  const [comAction, setComAction] = useState<StateStatusType>({
    comId: "",
    active: false,
  });
  const { loading, error, data } = useQuery(GET_COMMENTS, {
    variables: { post_id: postData.post_id },
  });

  useEffect(() => {
    if (!loading && !error && data) {
      setComments(data.getComments);
    }
  }, [data]);

  const [addCommentPost] = useMutation(ADD_COMMENT_POST, {
    variables: {
      post_id: postData.post_id,
      user_id: User.id,
      comment_text: comValue,
      username: User.name,
      com_id: uuidv4(),
    },
    refetchQueries: [
      { query: GET_COMMENTS, variables: { post_id: postData.post_id } },
    ],
  });

  const addComment = async () => {
    if (comValue === "") return;
    await addCommentPost()
      .then(() => {
        refetch();
        setComValue("");
      })
      .catch((res) => console.log(res));
  };

  const [deleteCommentPost] = useMutation(DELETE_COMMENT_POST, {
    variables: {
      post_id: postData.post_id,
      user_id: User.id,
      com_id: comAction.comId,
    },
    refetchQueries: [
      { query: GET_COMMENTS, variables: { post_id: postData.post_id } },
    ],
  });

  const handelDeleteComment = async () => {
    if (comAction.comId === "") return;
    await deleteCommentPost()
      .then(() => {
        refetch();
        setComAction({ comId: "", active: false });
      })
      .catch((res) => console.log(res));
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
    <div className={styles.comments}>
      <div className={styles.addComment}>
        <div>
          <BiUser />
        </div>
        <div>
          <textarea
            value={comValue}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setComValue(e.target.value)
            }
            maxLength={250}
            placeholder="Write a comment"
          ></textarea>
        </div>
        <div>
          <button onClick={() => addComment()}>Share</button>
        </div>
      </div>
      {comments.length > 0
        ? comments.map((item: CommentType, id: number) => (
            <div key={id} className={styles.comment}>
              <div className={styles.comment_user}>
                <BiUser />
              </div>
              <div className={styles.comment__container}>
                <div className={styles.comment__header}>
                  <span>{item.username}</span>
                  <div className={styles.comment__header__sec}>
                    <span>{timeExpiredFrom(item.createdAt)}</span>
                    <div id="ComModal" className={styles.comSet}>
                      <SlOptionsVertical
                        id="ComModal"
                        onClick={() =>
                          setComAction((prev) => ({
                            active: !prev.active,
                            comId: item.com_id,
                          }))
                        }
                      />
                      {comAction.active && comAction.comId === item.com_id ? (
                        <div className={styles.comSet__opt} id="ComModal">
                          <div
                            id="ComModal"
                            onClick={() => handelDeleteComment()}
                          >
                            Delete
                          </div>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
                <p>{item.comment_text}</p>
              </div>
            </div>
          ))
        : null}
    </div>
  );
}
