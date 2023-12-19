import { CSSProperties, useContext, useEffect, useState } from "react";
import Menu from "./Menu";
import Posts from "./Posts";
import styles from "./posts.module.css";
import AddPost from "./AddPost";
import { useSearchParams } from "react-router-dom";
import { AuthContext, UserAuth } from "../../context/Auth";
import { useQuery } from "@apollo/client";
import { GET_POSTS } from "../../Query/postsQuery";
import { ClipLoader } from "react-spinners";

export interface PostType {
  post_id: string;
  user_id: string;
  createdAt: string;
  post_text: string;
  post_img: string;
  user_name: string;
  user_email: string;
}

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  marginTop: "10%",
};

export default function Main() {
  const [addPostModal, setAddPostModal] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams({});
  const [postsData, setPostsData] = useState<PostType[]>([]);
  const [postsPage, setPostsPage] = useState<number>(1);
  const { User }: UserAuth = useContext(AuthContext);
  const nav = searchParams.get("nav");
  const search = searchParams.get("search");
  const { loading, error, data, refetch } = useQuery(GET_POSTS, {
    variables: {
      type: nav ? nav : search,
      user_id: User.id,
      count: postsPage ? postsPage.toString() : "1",
    },
  });

  useEffect(() => {
    if (!loading && !error && data) {
      setPostsData((prev) => {
        if (prev.length === 0) return data.GetPosts;
        if (postsPage === 1 && data.GetPosts.length === 0) return [];
        if (postsPage * 10 > prev.length) {
          return [...prev, ...data.GetPosts];
        } else {
          const exist = prev.filter((item) => data.GetPosts.includes(item));
          if (postsPage === 1) return data.GetPosts;
          if (postsPage > 1 && exist.length < 1)
            return [...prev, ...data.GetPosts];
          if (exist.length > 0) return prev;
        }
      });
    }
  }, [data]);

  useEffect(() => {
    setPostsPage(1);
    refetch();
  }, [nav, search]);

  useEffect(() => {
    if (!addPostModal) return;
    const parent = document.querySelector("body");
    const documentWidth = document.documentElement.clientWidth;
    const scrollbarWidth = Math.abs(window.innerWidth - documentWidth);
    if (parent) {
      parent.style.overflow = "hidden";
      parent.style.paddingRight = `${scrollbarWidth}px`;
    }
    return () => {
      if (parent) {
        parent.style.overflow = "auto";
        parent.style.paddingRight = "0px";
      }
    };
  }, [addPostModal]);

  const closeModal = (e: React.MouseEvent) => {
    let target = e.target as HTMLElement;
    if (target.id === "modal") {
      setAddPostModal(false);
    }
  };

  return (
    <>
      <div className={styles.posts}>
        <Menu
          setAddPostModal={setAddPostModal}
          setSearchParams={setSearchParams}
          navParams={{ nav: nav, search: search }}
        />
        {loading ? (
          <ClipLoader
            color="#3a86ff"
            loading={loading}
            cssOverride={override}
            size={150}
            aria-label="ClipLoader"
            speedMultiplier={0.6}
          />
        ) : null}
        {postsData.length > 0 ? (
          <Posts
            postsData={postsData}
            User={User}
            setPostsPage={setPostsPage}
            postsType={nav ? nav : search || "all"}
            pageCount={postsPage.toString() || "1"}
          />
        ) : (
          <div>Not Found Any Posts</div>
        )}
      </div>
      {addPostModal ? (
        <div
          id="modal"
          className={styles.posts__addPost}
          onClick={(e) => closeModal(e)}
        >
          <AddPost
            setAddPostModal={setAddPostModal}
            User={User}
            postsType={nav ? nav : search || "all"}
            pageCount={postsPage.toString() || "1"}
          />
        </div>
      ) : null}
    </>
  );
}
