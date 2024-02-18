import { FaRegCommentAlt } from "react-icons/fa";
import styles from "./blog.module.css";
import { AiOutlineHeart } from "react-icons/ai";
import { BiUser } from "react-icons/bi";
import { timeExpiredFrom } from "../../assets/assets";
import { GET_USER_INFO } from "../../Query/userQuery";
import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";

type PROPS = {
  createdAt: string;
  user_id: string;
};
type OwnerType = {
  id: string;
  name: string;
  email: string;
};

export default function TopMenu({ createdAt, user_id }: PROPS) {
  const [owner, setOwner] = useState<OwnerType | null>(null);
  const { loading, data } = useQuery(GET_USER_INFO, {
    variables: { id: user_id },
  });
  useEffect(() => {
    if (!loading && data) {
      const ownerData = data.getUserInfo;
      if (!ownerData.id) return;
      setOwner(ownerData);
    }
  }, [data]);
  return (
    <div className={styles.blog__top__menu}>
      <div className={styles.blog__top__menu__user}>
        <BiUser />
        <div className={styles.blog__top__menu__userInfo}>
          <div>
            <span>{owner?.name}</span>
            <button>Follow</button>
          </div>
          <span className={styles.blog__top__menu__timer}>
            {timeExpiredFrom(createdAt)}
          </span>
        </div>
      </div>
      <div className={styles.blog__top__menu__action}>
        <span>
          <AiOutlineHeart />
          1231
        </span>
        <span>
          <FaRegCommentAlt />
          1231
        </span>
      </div>
    </div>
  );
}
