import { gql } from "@apollo/client";

export const GET_BLOG = gql`
  query getBlog($id: String!) {
    getBlog(id: $id) {
      id
      user_id
      title
      blogContent
      tags
      baner
      miniature
      createdAt
    }
  }
`;
