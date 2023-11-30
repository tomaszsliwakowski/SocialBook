import { GraphQLList } from "graphql";
import { PostType } from "../types/postType";
import { pool } from "../../database/mySqlConnect";

export const GET_POSTS = {
  type: new GraphQLList(PostType),
  async resolve(parent: any, args: any) {
    const basePosts: any = await pool.query(`SELECT * FROM posts`);
    return basePosts[0].slice(0, 11);
  },
};
export const GET_POST = {
  type: PostType,
  async resolve(parent: any, args: any) {},
};
