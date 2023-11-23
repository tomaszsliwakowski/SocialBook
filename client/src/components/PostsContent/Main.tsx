import { useEffect, useState } from "react";
import Menu from "./Menu";
import Posts from "./Posts";
import styles from "./posts.module.css";
import AddPost from "./AddPost";
import { useSearchParams } from "react-router-dom";

export interface POST_TYPE {
  id: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
  data: string;
  content: {
    text: string;
    image: string;
  };
  like: string;
  comments: string;
}

const postsDataExample: POST_TYPE[] = [
  {
    id: "awdawdawd",
    user: {
      id: "9dca4302444e2281dfe3",
      name: "testowy",
      email: "test@gmail.com",
    },
    data: "21.11.2023",
    content: {
      text: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere, odit laboriosam blanditiis qui reprehenderit dolore aliquid molestiae, impedit placeat nulla suscipit necessitatibus mollitia. Molestias et nemo beatae ut, veniam dolor!",
      image:
        "https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    like: "892",
    comments: "102",
  },
  {
    id: "awdawdawd",
    user: {
      id: "9dca4302444e2ssas",
      name: "testowy",
      email: "test@gmail.com",
    },
    data: "21.11.2023",
    content: {
      text: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere, odit laboriosam blanditiis qui reprehenderit dolore aliquid molestiae, impedit placeat nulla suscipit necessitatibus mollitia. Molestias et nemo beatae ut, veniam dolor!",
      image:
        "https://x-kom.pl/img/media/inspiration/large-20231117134508-black-week-4-2023-1920x600.jpg",
    },
    like: "892",
    comments: "102",
  },
];

export default function Main() {
  const [addPostModal, setAddPostModal] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams({});
  const [postsData, setPostsData] = useState(postsDataExample);
  const nav = searchParams.get("nav");
  const search = searchParams.get("search");

  useEffect(() => {
    const parent = document.querySelector("body");
    const documentWidth = document.documentElement.clientWidth;
    const scrollbarWidth = Math.abs(window.innerWidth - documentWidth);
    if (parent && addPostModal) {
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
        <Posts postsData={postsData} />
      </div>
      {addPostModal ? (
        <div
          id="modal"
          className={styles.posts__addPost}
          onClick={(e) => closeModal(e)}
        >
          <AddPost setAddPostModal={setAddPostModal} />
        </div>
      ) : null}
    </>
  );
}
