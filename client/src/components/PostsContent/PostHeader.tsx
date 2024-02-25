import { BiUser } from "react-icons/bi";
import styles from "./posts.module.css";
import { UserType } from "../../context/Auth";
import { PostType } from "./Main";
import { PostStateStatusType } from "./Post";
import { MdDone } from "react-icons/md";
import {
  handleAddFollow,
  handleDeleteFollow,
  timeExpiredFrom,
} from "../../assets/assets";
import PostModal from "./PostModal";

type PROPS = {
  User: UserType;
  postData: PostType;
  sub: PostStateStatusType;
  postAction: PostStateStatusType;
  deleteFollow: Function;
  addFollow: Function;
  refetchUser: Function;
  actionPostOff: Function;
  handleDeletePost: Function;
  handleStatusSubChange: Function;
};

export default function PostHeader({
  User,
  postData,
  sub,
  postAction,
  deleteFollow,
  addFollow,
  refetchUser,
  actionPostOff,
  handleDeletePost,
  handleStatusSubChange,
}: PROPS) {
  return (
    <div className={styles.post__header}>
      <div className={styles.post__header__info}>
        <div className={styles.post__header__user}>
          <BiUser className={styles.post__header__userIcon} />
          <span>{postData.user_name}</span>
          {User.id !== postData.user_id ? (
            sub.active ? (
              <div
                className={styles.follow}
                onClick={() => handleStatusSubChange(false)}
              >
                <MdDone
                  onClick={() => handleDeleteFollow(deleteFollow, refetchUser)}
                />
              </div>
            ) : (
              <button onClick={() => handleAddFollow(addFollow, refetchUser)}>
                Follow
              </button>
            )
          ) : null}
        </div>
        <span className={styles.post__header__time}>
          {timeExpiredFrom(postData.createdAt)}
        </span>
      </div>
      {User.id === postData.user_id ? (
        <PostModal
          actionPostOff={actionPostOff}
          handleDeletePost={handleDeletePost}
          postAction={postAction}
        />
      ) : null}
    </div>
  );
}
