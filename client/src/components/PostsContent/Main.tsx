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
import { ThemeContext } from "../../context/ThemeContext";

export interface PostType {
  post_id: string;
  user_id: string;
  createdAt: string;
  post_text: string;
  post_img: string;
  user_name: string;
  user_email: string;
}

type PostsKeyType = keyof PostType;

const override: CSSProperties = {
  display: "block",
  marginTop: "10%",
};

export default function Main() {
  const { theme } = useContext(ThemeContext);
  const [addPostModal, setAddPostModal] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams({});
  const [postsData, setPostsData] = useState<PostType[]>([]);
  const [postsPage, setPostsPage] = useState<number>(1);
  const { User, refetchUser }: UserAuth = useContext(AuthContext);
  const nav = searchParams.get("nav");
  const search = searchParams.get("search");
  const { loading, error, data, refetch } = useQuery(GET_POSTS, {
    variables: {
      type: nav ? nav : search,
      user_id: User.id,
      count: postsPage ? postsPage.toString() : "1",
    },
  });

  function getUniqueListBy(arr: PostType[], key: PostsKeyType) {
    return [...new Map(arr.map((item) => [item[key], item])).values()];
  }

  useEffect(() => {
    if (!loading && !error && data) {
      setPostsData((prev) => {
        const newData = data.getPosts;
        if (prev.length === 0) return newData;
        if (postsPage === 1) return newData;
        let allData: PostType[] = prev.concat(newData);
        return getUniqueListBy(allData, "post_id");
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
    if (parent) {
      parent.classList.add("scrollOff" + theme);
    }
    return () => {
      if (parent) {
        parent.classList.remove("scrollOff" + theme);
      }
    };
  }, [addPostModal]);

  const closeModal = (e: React.MouseEvent) => {
    let target = e.target as HTMLElement;
    if (target.id === "modal") {
      setAddPostModal(false);
    }
  };

  const refreshPage = () => {
    window.location.reload();
  };

  const paramsMenuHandler = (
    deleteParam: string,
    name: string,
    value: string
  ) => {
    setSearchParams((prev) => {
      prev.delete(deleteParam);
      prev.set(name, value);
      return prev;
    });
  };

  const handleAddPostModal = (value: boolean) => {
    setAddPostModal(value);
  };

  return (
    <>
      <div className={styles.posts}>
        <Menu
          handleAddPostModal={handleAddPostModal}
          paramsMenuHandler={paramsMenuHandler}
          navParams={{ nav: nav, search: search }}
        />
        {loading ? (
          <div className={styles.posts__loading}>
            <ClipLoader
              color="#3a86ff"
              loading={loading}
              cssOverride={override}
              size={150}
              aria-label="ClipLoader"
              speedMultiplier={0.6}
            />
          </div>
        ) : null}
        {!loading ? (
          postsData.length > 0 ? (
            <Posts
              postsData={postsData}
              User={User}
              setPostsPage={setPostsPage}
              pageCount={postsPage.toString() || "1"}
              setPostsData={setPostsData}
              refetchUser={refetchUser}
            />
          ) : (
            <div className={styles.posts__notFound}>
              <span>Not Found Any Posts</span>
              <button onClick={() => refreshPage()}>Refresh</button>
            </div>
          )
        ) : null}
      </div>
      {addPostModal ? (
        <div
          id="modal"
          className={styles.posts__addPost}
          onClick={(e) => closeModal(e)}
        >
          <AddPost
            handleAddPostModal={handleAddPostModal}
            User={User}
            setPostsData={setPostsData}
          />
        </div>
      ) : null}
    </>
  );
}
