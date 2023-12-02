import { gql } from "@apollo/client";

export const GET_POSTS = gql`
  query GetPosts {
    GetPosts {
      post_id
      user_id
      createdAt
      post_text
      post_img
      user_name
      user_email
    }
  }
`;

export const GET_LIKES = gql`
  query GetLikes($post_id: String!, $user_id: String!) {
    GetLikes(post_id: $post_id, user_id: $user_id) {
      likes
      comments_count
      liked
    }
  }
`;
