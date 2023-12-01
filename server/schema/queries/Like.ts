import { GraphQLNonNull, GraphQLString } from "graphql";
import { LikesType } from "../types/postType";
import { pool } from "../../database/mySqlConnect";

type ReturnType = {
  likes: string;
  comments_count: string;
};

export const GET_Likes = {
  type: LikesType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLString) },
  },
  async resolve(parent: any, args: { id: string }) {
    const likes: any = await pool.query(
      `SELECT * FROM likes WHERE post_id = '${args.id}'`
    );
    const comCount: any = await pool.query(
      `SELECT * FROM comments WHERE post_id ='${args.id}'`
    );
    const data: ReturnType = {
      likes: likes[0].length,
      comments_count: comCount[0].length,
    };
    if (!data.likes && !data.comments_count) return;
    return data;
  },
};
