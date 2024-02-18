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
  query getUserInfo($id: String!) {
    getUserInfo(id: $id) {
      id
      name
      email
    }
  }
`;
