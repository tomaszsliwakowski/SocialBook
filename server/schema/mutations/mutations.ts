import { GraphQLNonNull, GraphQLString } from "graphql";
import { UserType } from "../types/userType";
import bcrypt from "bcrypt";
import { pool } from "../../database/mySqlConnect";
import crypto from "crypto";
import { sign, verify } from "jsonwebtoken";
import { AccessToken } from "../../assets/assets";
import {
  AddPostType,
  CommentType,
  LikeType,
  PostType,
} from "../types/postType";
import { Request } from "express";
import { Blob } from "buffer";

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

    if (!user) {
      return null;
    }

    const valid = await bcrypt.compare(args.password, user.password);
    if (!valid) {
      return null;
    }
    const Token = sign({ userId: user.id }, AccessToken, {
      expiresIn: "7d",
    });

    res.cookie("IdUser", Token);

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

type addPostArgType = {
  post_id: string;
  user_id: string;
  post_text: string;
  post_img: string;
  user_name: string;
  user_email: string;
};

export const addPost = {
  type: AddPostType,
  args: {
    post_id: { type: new GraphQLNonNull(GraphQLString) },
    user_id: { type: new GraphQLNonNull(GraphQLString) },
    post_text: { type: new GraphQLNonNull(GraphQLString) },
    post_img: { type: new GraphQLNonNull(GraphQLString) },
    user_name: { type: new GraphQLNonNull(GraphQLString) },
    user_email: { type: new GraphQLNonNull(GraphQLString) },
  },
  async resolve(parent: any, args: addPostArgType, req: Request) {
    const cookie = req.cookies.IdUser;
    if (!cookie) return;
    const verifyUser = verify(cookie, AccessToken) as any;
    if (!verifyUser) return;
    const res: any = await pool
      .query(
        `INSERT INTO posts VALUES ('${args.post_id}','${args.user_id}',NOW(),'${args.post_text}','${args.post_img}','${args.user_name}','${args.user_email}')`
      )
      .then(() => {
        return args;
      })
      .catch((res) => console.log(res));

    return res;
  },
};

type deletePostArgType = {
  post_id: string;
};

export const deletePost = {
  type: PostType,
  args: {
    post_id: { type: new GraphQLNonNull(GraphQLString) },
  },
  async resolve(parent: any, args: deletePostArgType, req: Request) {
    const cookie = req.cookies.IdUser;
    if (!cookie) return;
    const verifyUser = verify(cookie, AccessToken) as any;
    if (!verifyUser) return;
    const res: any = await pool
      .query(`DELETE FROM posts WHERE post_id='${args.post_id}'`)
      .then(() => {
        pool.query(`DELETE FROM comments WHERE post_id='${args.post_id}'`);
        pool.query(`DELETE FROM likes WHERE post_id='${args.post_id}'`);
        return args;
      })
      .catch((res) => console.log(res));
    if (!res.post_id) return;
    return res;
  },
};

type LikeArgType = {
  post_id: string;
  user_id: string;
};

export const addLikePost = {
  type: LikeType,
  args: {
    post_id: { type: new GraphQLNonNull(GraphQLString) },
    user_id: { type: new GraphQLNonNull(GraphQLString) },
  },
  async resolve(parent: any, args: LikeArgType, req: Request) {
    const cookie = req.cookies.IdUser;
    if (!cookie) return;
    const verifyUser = verify(cookie, AccessToken) as any;
    if (!verifyUser) return;
    const res: any = await pool
      .query(`INSERT INTO likes VALUES ('${args.post_id}','${args.user_id}')`)
      .then(() => {
        return args;
      })
      .catch((res) => console.log(res));
    if (!res.post_id) return;
    return res;
  },
};

export const deleteLikePost = {
  type: LikeType,
  args: {
    post_id: { type: new GraphQLNonNull(GraphQLString) },
    user_id: { type: new GraphQLNonNull(GraphQLString) },
  },
  async resolve(parent: any, args: LikeArgType, req: Request) {
    const cookie = req.cookies.IdUser;
    if (!cookie) return;
    const verifyUser = verify(cookie, AccessToken) as any;
    if (!verifyUser) return;
    const res: any = await pool
      .query(
        `DELETE FROM likes WHERE (post_id='${args.post_id}' AND user_id='${args.user_id}')`
      )
      .then(() => {
        return args;
      })
      .catch((res) => console.log(res));
    if (!res.post_id) return;
    return res;
  },
};

type addCommentArgType = {
  post_id: string;
  user_id: string;
  comment_text: string;
  username: string;
  com_id: string;
};

export const addCommentPost = {
  type: CommentType,
  args: {
    post_id: { type: new GraphQLNonNull(GraphQLString) },
    user_id: { type: new GraphQLNonNull(GraphQLString) },
    comment_text: { type: new GraphQLNonNull(GraphQLString) },
    username: { type: new GraphQLNonNull(GraphQLString) },
    com_id: { type: new GraphQLNonNull(GraphQLString) },
  },
  async resolve(parent: any, args: addCommentArgType, req: Request) {
    const cookie = req.cookies.IdUser;
    if (!cookie) return;
    const verifyUser = verify(cookie, AccessToken) as any;
    if (!verifyUser) return;
    const res: any = await pool
      .query(
        `INSERT INTO comments VALUES ('${args.post_id}','${args.user_id}',NOW(),'${args.comment_text}','${args.username}','${args.com_id}')`
      )
      .then(() => {
        return args;
      })
      .catch((res) => console.log(res));
    if (!res.post_id) return;
    return res;
  },
};

type deleteCommentArgType = {
  post_id: string;
  user_id: string;
  com_id: string;
};
export const deleteCommentPost = {
  type: CommentType,
  args: {
    post_id: { type: new GraphQLNonNull(GraphQLString) },
    user_id: { type: new GraphQLNonNull(GraphQLString) },
    com_id: { type: new GraphQLNonNull(GraphQLString) },
  },
  async resolve(parent: any, args: deleteCommentArgType, req: Request) {
    const cookie = req.cookies.IdUser;
    if (!cookie) return;
    const verifyUser = verify(cookie, AccessToken) as any;
    if (!verifyUser) return;
    const res: any = await pool
      .query(
        `DELETE FROM comments WHERE (post_id='${args.post_id}' AND user_id='${args.user_id}' AND com_id='${args.com_id}')`
      )
      .then(() => {
        return args;
      })
      .catch((res) => console.log(res));
    if (!res.post_id) return;
    return res;
  },
};
