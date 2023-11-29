import { gql } from "@apollo/client";

export const GET_POSTS = gql`
  query GetPosts {
    GetPosts {
      post_id
      user_id
      createdAt
      post_text
      post_img
    }
  }
`;
