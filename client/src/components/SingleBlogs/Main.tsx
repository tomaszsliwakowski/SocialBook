import { useParams } from "react-router-dom";
import CommentsSection from "./CommentsSection";
import Content from "./Content";
import TopSection from "./TopSection";
import styles from "./blog.module.css";
import { useQuery } from "@apollo/client";
import { GET_BLOG } from "../../Query/blogQuery";
import { useEffect, useState } from "react";

export type BlogType = {
  id: string;
  user_id: string;
  title: string;
  blogContent: string;
  tags: string;
  baner: string;
  miniature: string;
  createdAt: string;
};

export default function Main() {
  const params = useParams();
  const [blog, setBlog] = useState<BlogType | null>(null);
  const { loading, data, error } = useQuery(GET_BLOG, {
    variables: { id: params.id },
  });

  useEffect(() => {
    if (!loading && data) {
      const blogData = data.getBlog;
      if (!blogData.id) return;
      setBlog(blogData);
    }
  }, [data]);

  return (
    <div className={styles.blog__main}>
      {!error && blog ? (
        <>
          <TopSection blog={blog} />
          <Content paragraphs={blog.blogContent} />
          <CommentsSection blog_id={blog.id} />
        </>
      ) : null}
    </div>
  );
}
