import { gql } from "@apollo/client";

export const GET_POSTS = gql`
  query getPosts($type: String!, $user_id: String!, $count: String!) {
    getPosts(type: $type, user_id: $user_id, count: $count) {
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
  query getLikes($post_id: String!, $user_id: String!) {
    getLikes(post_id: $post_id, user_id: $user_id) {
      likes
      comments_count
      liked
    }
  }
`;

export const GET_COMMENTS = gql`
  query getComments($post_id: String!) {
    getComments(post_id: $post_id) {
      post_id
      user_id
      createdAt
      comment_text
      username
      com_id
    }
  }
`;
