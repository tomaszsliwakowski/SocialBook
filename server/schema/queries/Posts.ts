import { GraphQLList } from "graphql";
import { PostType } from "../types/postType";

export const GET_POSTS = {
  type: new GraphQLList(PostType),
  async resolve() {},
};
export const GET_POST = {
  type: PostType,
  async resolve() {},
};
