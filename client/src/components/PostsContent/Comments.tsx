import React, { useEffect, useState } from "react";
import styles from "./posts.module.css";
import { BiUser } from "react-icons/bi";
import { useMutation, useQuery } from "@apollo/client";
import { PostType } from "./Main";
import { UserType } from "../../context/Auth";
import { ADD_COMMENT_POST } from "../../mutations/postsMutations";
import { GET_COMMENTS } from "../../Query/postsQuery";
import { SlOptionsVertical } from "react-icons/sl";

type PROPS = {
  postData: PostType;
  User: UserType;
};

type CommentType = {
  username: string;
  comment_text: string;
  createdAt: string;
};

export default function Comments({ postData, User }: PROPS) {
  const [comValue, setComValue] = useState("");
  const [comments, setComments] = useState([]);
  const { loading, error, data } = useQuery(GET_COMMENTS, {
    variables: { post_id: postData.post_id },
  });

  useEffect(() => {
    if (!loading && !error && data) {
      setComments(data.GetComments);
    }
  }, [data]);

  const [addCommentPost] = useMutation(ADD_COMMENT_POST, {
    variables: {
      post_id: postData.post_id,
      user_id: User.id,
      comment_text: comValue,
      username: User.name,
    },
    refetchQueries: [
      { query: GET_COMMENTS, variables: { post_id: postData.post_id } },
    ],
  });

  const addComment = async () => {
    if (comValue === "") return;
    await addCommentPost()
      .then(() => setComValue(""))
      .catch((res) => console.log(res));
  };

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
                    <span>{`${new Date(
                      parseInt(item.createdAt)
                    ).toLocaleString()}`}</span>

                    <SlOptionsVertical />
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
