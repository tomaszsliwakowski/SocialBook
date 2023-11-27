import { GraphQLList } from "graphql";
import { CommentType } from "../types/postType";

export const GET_Comments = {
  type: new GraphQLList(CommentType),
  async resolve() {},
};
