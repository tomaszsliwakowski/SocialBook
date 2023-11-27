import { gql } from "@apollo/client";

export const ADD_POST = gql`
  mutation addPost($post_id: ID!,$user_id: ID!,post_text: String!,post_img: String!) {
    addPost(post_id: $post_id, user_id: $user_id,post_text:$post_text,post_img:$post_img ) {
        post_id,
        user_id,
        post_text,
        post_img
    }
  }
`;
export const DELETE_POST = gql`
  mutation deletePost($post_id: ID!) {
    deletePost(post_id: $post_id) {
      post_id
    }
  }
`;
export const ADD_LIKE_POST = gql`
  mutation addLikePost($post_id: ID!, $user_id: ID!) {
    addLikePost(post_id: $post_id, user_id: $user_id) {
      post_id
      user_id
    }
  }
`;
export const DELETE_LIKE_POST = gql`
  mutation deleteLikePost($post_id: ID!, $user_id: ID!) {
    deleteLikePost(post_id: $post_id, user_id: $user_id) {
      post_id
      user_id
    }
  }
`;
export const ADD_COMMENT_POST = gql`
  mutation addCommentPost($post_id: ID!,$user_id: ID!,comment_text: String!) {
    addCommentPost(post_id: $post_id, user_id: $user_id,comment_text:$comment_text) {
        post_id,
        user_id,
        comment_text
    }
  }
`;
export const DELETE_COMMENT_POST = gql`
  mutation deleteCommentPost($post_id: ID!, $user_id: ID!) {
    deleteCommentPost(post_id: $post_id, user_id: $user_id) {
      post_id
      user_id
    }
  }
`;
