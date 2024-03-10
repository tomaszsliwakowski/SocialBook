import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import styles from "../../BlogsContent/blogs.module.css";
import { motion, useAnimation, useInView } from "framer-motion";
import { BlogRouteBuilder } from "../../../routes";
import { BlogsType } from "../../BlogsContent/Main";
import BlogStat from "../../BlogsContent/BlogStat";
import BlogTags from "../../BlogsContent/BlogTags";
import BlogDesc from "../../BlogsContent/BlogDesc";
import BlogPanel from "../../BlogsContent/BlogPanel";

type PROPS = {
  blog: BlogsType;
};

export default function Blog({ blog }: PROPS) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const slideControls = useAnimation();
  useEffect(() => {
    if (isInView) {
      slideControls.start("visible");
    }
  }, [isInView]);

  return (
    <motion.li
      className={styles.blogs__content__element}
      variants={{
        hidden: { opacity: 0, y: 85 },
        visible: { opacity: 1, y: 0 },
      }}
      initial="hidden"
      animate={slideControls}
      transition={{ duration: 1.5, delay: 0.25 }}
      ref={ref}
    >
      <Link
        to={BlogRouteBuilder(blog.id)}
        className={styles.blogs__content__image}
      >
        <img src={blog.miniature} alt="img" />
        <BlogStat likes={blog.likes} comments={blog.comments} />
      </Link>
      <BlogTags tags={blog.tags} />
      <BlogDesc title={blog.title} blogContent={blog.blogContent} />
      <BlogPanel
        userName={blog.userName}
        createdAt={blog.createdAt}
        creatorId={blog.user_id}
      />
    </motion.li>
  );
}
