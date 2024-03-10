import styles from "./blogs.module.css";
import { BiUser } from "react-icons/bi";
import { BsBookmarks } from "react-icons/bs";
import { BsBookmarksFill } from "react-icons/bs";
import {
  followCheck,
  handleAddFollow,
  handleDeleteFollow,
  timeExpiredFrom,
} from "../../assets/assets";
import { useContext, useEffect, useState } from "react";
import { AuthContext, UserAuth } from "../../context/Auth";
import { MdDone } from "react-icons/md";
import { useMutation } from "@apollo/client";
import { ADD_FOLLOW, DELETE_FOLLOW } from "../../mutations/postsMutations";

type PROPS = {
  userName: string;
  createdAt: string;
  creatorId: string;
};
type StateStatusType = {
  postId: string;
  active: boolean;
};

export default function BlogPanel({ userName, createdAt, creatorId }: PROPS) {
  const { User, refetchUser }: UserAuth = useContext(AuthContext);
  const [saveStatus, setSaveStatus] = useState(false);
  const [sub, setSub] = useState<StateStatusType>({
    postId: "",
    active: followCheck(User.followers, creatorId),
  });

  const saveHandler = (state: boolean) => {
    setSaveStatus(state);
  };

  const [addFollow] = useMutation(ADD_FOLLOW, {
    variables: {
      user_id: User.id,
      follower_id: creatorId,
    },
  });
  const [deleteFollow] = useMutation(DELETE_FOLLOW, {
    variables: {
      user_id: User.id,
      follower_id: creatorId,
    },
  });
  useEffect(() => {
    setSub((prev) => ({
      ...prev,
      active: followCheck(User.followers, creatorId),
    }));
  }, [User.followers, creatorId]);

  return (
    <div className={styles.blogs__content__info}>
      <div className={styles.blogs__content__user}>
        <div className={styles.blogs__content__userIcon}>
          <BiUser />
        </div>
        <div>
          <div className={styles.blogs__content__userInfo}>
            <span>{userName}</span>
            {User.id !== creatorId ? (
              sub.active ? (
                <div
                  className={styles.UserFollow}
                  onClick={() => setSub((prev) => ({ ...prev, active: false }))}
                >
                  <MdDone
                    onClick={() =>
                      handleDeleteFollow(deleteFollow, refetchUser)
                    }
                  />
                </div>
              ) : (
                <button onClick={() => handleAddFollow(addFollow, refetchUser)}>
                  Follow
                </button>
              )
            ) : null}
          </div>
          <span className={styles.blogs__content__createTime}>
            {timeExpiredFrom(createdAt)}
          </span>
        </div>
      </div>
      {User.id !== "" ? (
        <div className={styles.blogs__content__save}>
          {saveStatus ? (
            <BsBookmarksFill onClick={() => saveHandler(false)} />
          ) : (
            <BsBookmarks onClick={() => saveHandler(true)} />
          )}
        </div>
      ) : null}
    </div>
  );
}
