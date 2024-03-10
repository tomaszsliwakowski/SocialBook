import PhotoSlider from "../slider/PhotoSlider";
import styles from "./main.module.css";
import Explore from "./explore";
import PupularBlogs from "./PupularBlogs";
import Typed from "react-typed";
import { motion } from "framer-motion";
import { AuthContext, UserAuth } from "../../../context/Auth";
import { useContext, useEffect, useState } from "react";
import { BlogsType } from "../../BlogsContent/Main";
import { useQuery } from "@apollo/client";
import { GET_BLOGS } from "../../../Query/blogQuery";

export default function Main() {
  const { User }: UserAuth = useContext(AuthContext);
  const [blogs, setBlogs] = useState<BlogsType[]>([]);

  const { loading, error, data } = useQuery(GET_BLOGS, {
    variables: {
      type: "For You",
      search: "",
      searchType: "title",
      tag: "All",
      timeSpan: "All",
      page: 0,
      userId: "",
    },
  });
  useEffect(() => {
    if (!loading && !error && data) {
      const newData = data.getBlogs;
      setBlogs(newData || []);
    }
  }, [data]);

  return (
    <>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 85 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        animate="visible"
        transition={{ duration: 2, delay: 0.25 }}
        className={styles.main}
      >
        <div className={styles.main__content}>
          <div className={styles.main__container}>
            <h1>
              Welcome to <strong className={styles.strong}>S</strong>ocial
              <strong className={styles.strong}>B</strong>ook
            </h1>
            <br />
            <div className={styles.smallText}>
              <Typed
                strings={[
                  "Share and discover your stories and creative ideas.",
                  "Talk to other people and share your opinions.",
                ]}
                typeSpeed={80}
                backSpeed={50}
                startDelay={1000}
                loop
              />
            </div>
          </div>
          <Explore User={User} />
        </div>
        <div className={styles.main__images}>
          <PhotoSlider />
        </div>
      </motion.div>
      <PupularBlogs blogs={blogs} />
    </>
  );
}
