import { GraphQLNonNull, GraphQLString } from "graphql";
import { BlogArgType, BlogType, LikeBlogType } from "../types/blogType";
import { Request } from "express";
import { verify } from "jsonwebtoken";
import { AccessToken } from "../../assets/assets";
import { pool } from "../../database/mySqlConnect";

export type CreatorDataType = {
  id: string;
  user_id: string;
  title: string;
  blogContent: (
    | {
        id: string;
        type: string;
        content: string | undefined;
        images: string[];
      }
    | {
        id: string;
        type: string;
        images: string[];
      }
    | {
        id: string;
        type: string;
        content: string | undefined;
      }
  )[];
  tags: string[];
  baner: string;
  miniature: string;
};

export const addBlog = {
  type: BlogType,
  args: {
    blogData: {
      type: new GraphQLNonNull(BlogArgType),
    },
  },
  async resolve(
    parent: any,
    args: { blogData: CreatorDataType },
    req: Request
  ) {
    const cookie = req.cookies.IdUser;
    if (!cookie) return;
    const verifyUser = verify(cookie, AccessToken) as any;
    if (!verifyUser) return;
    const arg = args.blogData;
    const res: { id: string } | void = await pool
      .query(
        `INSERT INTO blogs VALUES ('${arg.id}','${arg.user_id}','${arg.title}','${arg.blogContent}','${arg.tags}','${arg.baner}','${arg.miniature}',NOW())`
      )
      .then(() => {
        return { id: arg.id };
      })
      .catch((res) => console.log(res));

    return res;
  },
};

type deletePostArgType = {
  blog_id: string;
};

export const deleteBlog = {
  type: BlogType,
  args: {
    blog_id: { type: new GraphQLNonNull(GraphQLString) },
  },
  async resolve(parent: any, args: deletePostArgType, req: Request) {
    const cookie = req.cookies.IdUser;
    if (!cookie) return;
    const verifyUser = verify(cookie, AccessToken) as any;
    if (!verifyUser) return;
    const res: deletePostArgType | void = await pool
      .query(`DELETE FROM blogs WHERE id='${args.blog_id}'`)
      .then(() => {
        pool.query(`DELETE FROM blogscomments WHERE blog_id='${args.blog_id}'`);
        pool.query(`DELETE FROM blogslikes WHERE blog_id='${args.blog_id}'`);
        return args;
      })
      .catch((res) => console.log(res));
    if (!res || (res && !res.blog_id)) return;
    return res;
  },
};

type LikeArgType = {
  blog_id: string;
  user_id: string;
};

export const addLikeBlog = {
  type: LikeBlogType,
  args: {
    blog_id: { type: new GraphQLNonNull(GraphQLString) },
    user_id: { type: new GraphQLNonNull(GraphQLString) },
  },
  async resolve(parent: any, args: LikeArgType, req: Request) {
    const cookie = req.cookies.IdUser;
    if (!cookie) return;
    const verifyUser = verify(cookie, AccessToken) as any;
    if (!verifyUser) return;
    const res: LikeArgType | void = await pool
      .query(
        `INSERT INTO blogslikes VALUES ('${args.blog_id}','${args.user_id}')`
      )
      .then(() => {
        return args;
      })
      .catch((res) => console.log(res));
    if (!res || (res && !res.blog_id)) return;
    return res;
  },
};

export const deleteLikeBlog = {
  type: LikeBlogType,
  args: {
    blog_id: { type: new GraphQLNonNull(GraphQLString) },
    user_id: { type: new GraphQLNonNull(GraphQLString) },
  },
  async resolve(parent: any, args: LikeArgType, req: Request) {
    const cookie = req.cookies.IdUser;
    if (!cookie) return;
    const verifyUser = verify(cookie, AccessToken) as any;
    if (!verifyUser) return;
    const res: LikeArgType | void = await pool
      .query(
        `DELETE FROM blogslikes WHERE (blog_id='${args.blog_id}' AND user_id='${args.user_id}')`
      )
      .then(() => {
        return args;
      })
      .catch((res) => console.log(res));
    if (!res || (res && !res.blog_id)) return;
    return res;
  },
};
