import { GraphQLNonNull, GraphQLString } from "graphql";
import { BlogType } from "../types/blogType";
import { pool } from "../../database/mySqlConnect";

export const getBlog = {
  type: BlogType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLString) },
  },
  async resolve(parent: any, args: { id: string }) {
    const [rows]: any = await pool.query(
      `SELECT * FROM blogs WHERE id = '${args.id}'`
    );
    return rows[0];
  },
};
