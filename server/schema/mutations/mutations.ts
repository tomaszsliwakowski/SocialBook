import { GraphQLNonNull, GraphQLString } from "graphql";
import { UserType } from "../types/userType";
import bcrypt from "bcrypt";
import { pool } from "../../database/mySqlConnect";
import crypto from "crypto";
import { sign } from "jsonwebtoken";
const RefreshToken = "awfjefojw3w2fi3fji";
const AccessToken = "a4r3f43f35ty5g4g";

export const loginUser = {
  type: UserType,
  args: {
    email: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
  },
  async resolve(
    parent: any,
    args: { email: string; password: string },
    { res }: any
  ) {
    const [rows]: any = await pool.query(
      `SELECT * FROM users WHERE email = '${args.email}'`
    );
    const user = rows[0];
    if (!rows[0].email) {
      return null;
    }

    const valid = await bcrypt.compare(args.password, user.password);
    if (!valid) {
      return null;
    }
    const refreshToken = sign({ userId: user.id }, RefreshToken, {
      expiresIn: "7d",
    });
    const accessToken = sign({ userId: user.id }, AccessToken, {
      expiresIn: "15min",
    });
    res.cookie("refresh-token", refreshToken);
    res.cookie("access-token", accessToken);
    return { id: user.id, name: user.name, email: user.email };
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
    const id = crypto.randomBytes(10).toString("hex");
    await pool.query(
      `INSERT INTO users VALUES ('${id}','${args.name}','${args.email}','${hashedPassword}')`
    );
    return { id: id };
  },
};
