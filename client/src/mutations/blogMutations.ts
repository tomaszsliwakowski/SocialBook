import { gql } from "@apollo/client";

export const ADD_BLOG = gql`
  mutation addBlog($blogData: BlogArgType!) {
    addBlog(blogData: $blogData) {
      id
    }
  }
`;

export const DELETE_BLOG = gql`
  mutation deletePost($blog_id: String!) {
    deletePost(blog_id: $blog_id) {
      blog_id
    }
  }
`;
export const ADD_LIKE_BLOG = gql`
  mutation addLikeBlog($blog_id: String!, $user_id: String!) {
    addLikeBlog(blog_id: $blog_id, user_id: $user_id) {
      blog_id
      user_id
    }
  }
`;
export const DELETE_LIKE_BLOG = gql`
  mutation deleteLikeBlog($blog_id: String!, $user_id: String!) {
    deleteLikeBlog(blog_id: $blog_id, user_id: $user_id) {
      blog_id
      user_id
    }
  }
`;
