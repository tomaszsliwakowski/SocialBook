import { gql } from "@apollo/client";

export const ADD_POST = gql`
  mutation addPost(
    $post_id: String!
    $user_id: String!
    $post_text: String!
    $post_img: String!
    $user_name: String!
    $user_email: String!
  ) {
    addPost(
      post_id: $post_id
      user_id: $user_id
      post_text: $post_text
      post_img: $post_img
      user_name: $user_name
      user_email: $user_email
    ) {
      post_id
      user_id
      post_text
      post_img
      user_name
      user_email
    }
  }
`;
export const DELETE_POST = gql`
  mutation deletePost($post_id: String!) {
    deletePost(post_id: $post_id) {
      post_id
    }
  }
`;
export const ADD_LIKE_POST = gql`
  mutation addLikePost($post_id: String!, $user_id: String!) {
    addLikePost(post_id: $post_id, user_id: $user_id) {
      post_id
      user_id
    }
  }
`;
export const DELETE_LIKE_POST = gql`
  mutation deleteLikePost($post_id: String!, $user_id: String!) {
    deleteLikePost(post_id: $post_id, user_id: $user_id) {
      post_id
      user_id
    }
  }
`;
export const ADD_COMMENT_POST = gql`
  mutation addCommentPost(
    $post_id: String!
    $user_id: String!
    $comment_text: String!
    $username: String!
    $com_id: String!
  ) {
    addCommentPost(
      post_id: $post_id
      user_id: $user_id
      comment_text: $comment_text
      username: $username
      com_id: $com_id
    ) {
      post_id
      user_id
      comment_text
      username
      com_id
    }
  }
`;
export const DELETE_COMMENT_POST = gql`
  mutation deleteCommentPost(
    $post_id: String!
    $user_id: String!
    $com_id: String!
  ) {
    deleteCommentPost(post_id: $post_id, user_id: $user_id, com_id: $com_id) {
      post_id
      user_id
      com_id
    }
  }
`;
