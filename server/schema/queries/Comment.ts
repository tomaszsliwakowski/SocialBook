import { GraphQLList, GraphQLNonNull, GraphQLString } from "graphql";
import { CommentType } from "../types/postType";
import { pool } from "../../database/mySqlConnect";

export const getComments = {
  type: new GraphQLList(CommentType),
  args: {
    post_id: { type: new GraphQLNonNull(GraphQLString) },
  },
  async resolve(parent: any, args: { post_id: string }) {
    const comments: any = await pool.query(
      `SELECT * FROM comments WHERE post_id = '${args.post_id}'`
    );
    return comments[0];
  },
};
