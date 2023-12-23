import { UserType } from "../types/userType";
import { pool } from "../../database/mySqlConnect";
import { verify } from "jsonwebtoken";
import { AccessToken } from "../../assets/assets";
import { Request } from "express";

export const USER_ME = {
  type: UserType,
  async resolve(parent: any, args: any, req: Request) {
    const cookie = req.cookies.IdUser;
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
