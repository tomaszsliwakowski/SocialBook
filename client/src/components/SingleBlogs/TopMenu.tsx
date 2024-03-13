import styles from "./blog.module.css";
import { BiUser } from "react-icons/bi";
import {
  followCheck,
  handleAddFollow,
  handleDeleteFollow,
  timeExpiredFrom,
} from "../../assets/assets";
import { GET_USER_NAME } from "../../Query/userQuery";
import { useMutation, useQuery } from "@apollo/client";
import { useContext, useEffect, useState } from "react";
import { ADD_FOLLOW, DELETE_FOLLOW } from "../../mutations/postsMutations";
import { AuthContext, UserAuth } from "../../context/Auth";
import { MdDone } from "react-icons/md";
import { TopMenuAction } from "./TopMenuAction";

type StateStatusType = {
  postId: string;
  active: boolean;
};

type PROPS = {
  createdAt: string;
  creatorId: string;
  blogId: string;
};
type OwnerType = {
  id: string;
  name: string;
};

export default function TopMenu({ createdAt, creatorId, blogId }: PROPS) {
  const [owner, setOwner] = useState<OwnerType | null>(null);
  const { User, refetchUser }: UserAuth = useContext(AuthContext);
  const [sub, setSub] = useState<StateStatusType>({
    postId: creatorId,
    active: followCheck(User.followers, creatorId),
  });

  const { loading, data } = useQuery(GET_USER_NAME, {
    variables: { id: creatorId },
  });

  useEffect(() => {
    if (!loading && data) {
      const ownerData = data.getUserName;
      if (!ownerData.id) return;
      setOwner(ownerData);
    }
  }, [data]);

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
    <div className={styles.blog__top__menu}>
      <div className={styles.blog__top__menu__user}>
        <BiUser />
        <div className={styles.blog__top__menu__userInfo}>
          <div>
            <span>{owner?.name}</span>
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
          <span className={styles.blog__top__menu__timer}>
            {timeExpiredFrom(createdAt)}
          </span>
        </div>
      </div>
      <TopMenuAction blogId={blogId} userId={User.id} />
    </div>
  );
}
