import { gql } from "@apollo/client";

export const GET_USER = gql`
  query getUser {
    getUser {
      id
      name
      email
      followers {
        user_id
        followers_id
      }
      observed {
        user_id
        followers_id
      }
    }
  }
`;
export const GET_USER_INFO = gql`
  query getUserInfo {
    getUserInfo {
      id
      name
      email
    }
  }
`;
export const GET_USER_NAME = gql`
  query getUserName($id: String!) {
    getUserName(id: $id) {
      id
      name
    }
  }
`;
