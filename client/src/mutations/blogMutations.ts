import { gql } from "@apollo/client";

export const ADD_BLOG = gql`
  mutation addBlog($blogData: BlogArgType!) {
    addBlog(blogData: $blogData) {
      id
    }
  }
`;
