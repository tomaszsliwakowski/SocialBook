import { gql } from "@apollo/client";

export const GET_USER = gql`
  query GetUser {
    GetUser {
      name
      email
    }
  }
`;
