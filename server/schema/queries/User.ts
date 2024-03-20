import { UserType } from "../types/userType";
import { pool } from "../../database/mySqlConnect";
import { verify } from "jsonwebtoken";
import { AccessToken } from "../../assets/assets";
import { Request } from "express";
import { GraphQLNonNull, GraphQLString } from "graphql";

export const getUser = {
  type: UserType,
  async resolve(parent: any, args: any, req: Request) {
    const cookie = req.cookies.IdUser;
    console.log(cookie);
    if (!cookie) return { name: "", email: "" };
    const data = verify(cookie, AccessToken) as any;
    if (!data) return { name: "", email: "" };
    const [rows]: any = await pool.query(
      `SELECT * FROM users WHERE id = '${data.userId}'`
    );
    const followersData: any = await pool.query(
      `SELECT * FROM followers WHERE user_id = '${data.userId}'`
    );
    const observedData: any = await pool.query(
      `SELECT * FROM followers WHERE followers_id = '${data.userId}'`
    );
    const followers = followersData[0];
    const observed = observedData[0];
    const { id, name, email } = rows[0];
    return {
      id: id,
      name: name,
      email: email,
      followers: followers,
      observed: observed,
    };
  },
};

export const getUserInfo = {
  type: UserType,
  async resolve(parent: any, args: any, req: Request) {
    const cookie = req.cookies.IdUser;
    if (!cookie) return { name: "", email: "" };
    const data = verify(cookie, AccessToken) as any;
    if (!data) return { name: "", email: "" };
    const [rows]: any = await pool.query(
      `SELECT * FROM users WHERE id = '${data.userId}'`
    );

    const { id, name, email } = rows[0];
    return {
      id: id,
      name: name,
      email: email,
    };
  },
};

export const getUserName = {
  type: UserType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLString) },
  },
  async resolve(parent: any, args: { id: string }, req: Request) {
    const cookie = req.cookies.IdUser;
    if (!cookie) return { name: "", email: "" };
    const data = verify(cookie, AccessToken) as any;
    if (!data) return { name: "", email: "" };
    const [rows]: any = await pool.query(
      `SELECT id,name FROM users WHERE id = '${args.id}'`
    );

    const { id, name } = rows[0];
    return {
      id: id,
      name: name,
    };
  },
};
