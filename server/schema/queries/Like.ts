import { GraphQLNonNull, GraphQLString } from "graphql";
import { LikesType } from "../types/postType";
import { pool } from "../../database/mySqlConnect";

export const GET_Likes = {
  type: LikesType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLString) },
  },
  async resolve(parent: any, args: any) {
    const likes: any = await pool.query(
      `SELECT * FROM likes WHERE post_id = '${args.id}'`
    );
    const comCount: any = await pool.query(
      `SELECT * FROM comments WHERE post_id ='${args.id}'`
    );
    const data = { likes: likes[0], comments_count: comCount[0].length - 1 };
    return data;
  },
};
