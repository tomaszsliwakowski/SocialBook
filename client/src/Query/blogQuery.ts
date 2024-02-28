import { gql } from "@apollo/client";

export const GET_BLOG = gql`
  query getBlog($id: String!) {
    getBlog(id: $id) {
      id
      user_id
      title
      blogContent
      tags
      baner
      miniature
      createdAt
    }
  }
`;
export const GET_LIKES_BLOG = gql`
  query getBlogLikes($blog_id: String!, $user_id: String!) {
    getBlogLikes(blog_id: $blog_id, user_id: $user_id) {
      likes
      comments_count
      liked
    }
  }
`;
export const GET_COMMENTS_BLOG = gql`
  query getBlogComments($blog_id: String!) {
    getBlogComments(blog_id: $blog_id) {
      blog_id
      user_id
      createdAt
      comment_text
      com_id
      name
    }
  }
`;
