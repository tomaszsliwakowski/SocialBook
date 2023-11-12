import { GraphQLNonNull, GraphQLString } from "graphql";
import { UserType } from "../types/userType";
import bcrypt from "bcrypt";
import { pool } from "../../database/mySqlConnect";

export const loginUser = {
  type: UserType,
  args: {
    email: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
  },
  async resolve(parent: any, args: { email: string; password: string }) {
    const [rows]: any = await pool.query(
      `SELECT * FROM users WHERE email = '${args.email}'`
    );
    return { email: rows[0].email };
  },
};

export const registerUser = {
  type: UserType,
  args: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
  },
  async resolve(
    parent: any,
    args: { name: string; email: string; password: string }
  ) {
    const hashedPassword = await bcrypt.hash(args.password, 10);
    //db
    return true;
  },
};
