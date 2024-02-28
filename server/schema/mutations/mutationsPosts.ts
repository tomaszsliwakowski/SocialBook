import { GraphQLNonNull, GraphQLString } from "graphql";
import { pool } from "../../database/mySqlConnect";
import { verify } from "jsonwebtoken";
import { AccessToken } from "../../assets/assets";
import {
  AddPostType,
  CommentType,
  FollowerType,
  LikeType,
  PostType,
} from "../types/postType";
import { Request } from "express";

type AddPostArgType = {
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
  async resolve(parent: any, args: AddPostArgType, req: Request) {
    const cookie = req.cookies.IdUser;
    if (!cookie) return;
    const verifyUser = verify(cookie, AccessToken) as any;
    if (!verifyUser) return;
    const res: AddPostArgType | void = await pool
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

type DeletePostArgType = {
  post_id: string;
};

export const deletePost = {
  type: PostType,
  args: {
    post_id: { type: new GraphQLNonNull(GraphQLString) },
  },
  async resolve(parent: any, args: DeletePostArgType, req: Request) {
    const cookie = req.cookies.IdUser;
    if (!cookie) return;
    const verifyUser = verify(cookie, AccessToken) as any;
    if (!verifyUser) return;
    const res: DeletePostArgType | void = await pool
      .query(`DELETE FROM posts WHERE post_id='${args.post_id}'`)
      .then(() => {
        pool.query(`DELETE FROM comments WHERE post_id='${args.post_id}'`);
        pool.query(`DELETE FROM likes WHERE post_id='${args.post_id}'`);
        return args;
      })
      .catch((res) => console.log(res));
    if (!res || (res && !res.post_id)) return;
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
    const res: LikeArgType | void = await pool
      .query(`INSERT INTO likes VALUES ('${args.post_id}','${args.user_id}')`)
      .then(() => {
        return args;
      })
      .catch((res) => console.log(res));
    if (!res || (res && !res.post_id)) return;
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
    const res: LikeArgType | void = await pool
      .query(
        `DELETE FROM likes WHERE (post_id='${args.post_id}' AND user_id='${args.user_id}')`
      )
      .then(() => {
        return args;
      })
      .catch((res) => console.log(res));
    if (!res || (res && !res.post_id)) return;
    return res;
  },
};

type AddCommentArgType = {
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
  async resolve(parent: any, args: AddCommentArgType, req: Request) {
    const cookie = req.cookies.IdUser;
    if (!cookie) return;
    const verifyUser = verify(cookie, AccessToken) as any;
    if (!verifyUser) return;
    const res: AddCommentArgType | void = await pool
      .query(
        `INSERT INTO comments VALUES ('${args.post_id}','${args.user_id}',NOW(),'${args.comment_text}','${args.username}','${args.com_id}')`
      )
      .then(() => {
        return args;
      })
      .catch((res) => console.log(res));
    if (!res || (res && !res.post_id)) return;
    return res;
  },
};

type DeleteCommentArgType = {
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
  async resolve(parent: any, args: DeleteCommentArgType, req: Request) {
    const cookie = req.cookies.IdUser;
    if (!cookie) return;
    const verifyUser = verify(cookie, AccessToken) as any;
    if (!verifyUser) return;
    const res: DeleteCommentArgType | void = await pool
      .query(
        `DELETE FROM comments WHERE (post_id='${args.post_id}' AND user_id='${args.user_id}' AND com_id='${args.com_id}')`
      )
      .then(() => {
        return args;
      })
      .catch((res) => console.log(res));
    if (!res || (res && !res.post_id)) return;
    return res;
  },
};

type FollowerType = {
  user_id: string;
  follower_id: string;
};

export const addFollow = {
  type: FollowerType,
  args: {
    user_id: { type: new GraphQLNonNull(GraphQLString) },
    follower_id: { type: new GraphQLNonNull(GraphQLString) },
  },
  async resolve(parent: any, args: FollowerType, req: Request) {
    const cookie = req.cookies.IdUser;
    if (!cookie) return;
    const verifyUser = verify(cookie, AccessToken) as any;
    if (!verifyUser) return;
    const res: FollowerType | void = await pool
      .query(
        `INSERT INTO followers VALUES ('${args.user_id}','${args.follower_id}')`
      )
      .then(() => {
        return args;
      })
      .catch((res) => console.log(res));
    if (!res || (res && !res.user_id)) return;
    return res;
  },
};

export const deleteFollow = {
  type: FollowerType,
  args: {
    user_id: { type: new GraphQLNonNull(GraphQLString) },
    follower_id: { type: new GraphQLNonNull(GraphQLString) },
  },
  async resolve(parent: any, args: FollowerType, req: Request) {
    const cookie = req.cookies.IdUser;
    if (!cookie) return;
    const verifyUser = verify(cookie, AccessToken) as any;
    if (!verifyUser) return;
    const res: FollowerType | void = await pool
      .query(
        `DELETE FROM followers WHERE (user_id='${args.user_id}' AND followers_id='${args.follower_id}')`
      )
      .then(() => {
        return args;
      })
      .catch((res) => console.log(res));
    if (!res || (res && !res.user_id)) return;
    return res;
  },
};
