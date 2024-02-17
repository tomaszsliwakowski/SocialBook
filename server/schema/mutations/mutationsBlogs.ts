import { GraphQLNonNull } from "graphql";
import { BlogArgType, BlogType } from "../types/blogType";
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
