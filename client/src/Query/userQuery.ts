import { gql } from "@apollo/client";

export const GET_USER = gql`
  query GetUser {
    GetUser {
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
