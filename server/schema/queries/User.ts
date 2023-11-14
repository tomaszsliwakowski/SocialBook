import { GraphQLID } from "graphql";
import { UserType } from "../types/userType";
import { pool } from "../../database/mySqlConnect";

export const USER_ME = {
  type: UserType,
  args: { id: { type: GraphQLID } },
  async resolve(parent: any, args: { id: string }) {
    //  const [rows]: any = await pool.query(
    //  `SELECT * FROM users WHERE id = '${args.id}'`
    // );

    return args;
  },
};
