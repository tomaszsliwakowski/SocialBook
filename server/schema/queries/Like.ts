import { GraphQLList } from "graphql";
import { LikeType } from "../types/postType";

export const GET_Likes = {
  type: new GraphQLList(LikeType),
  async resolve() {},
};
