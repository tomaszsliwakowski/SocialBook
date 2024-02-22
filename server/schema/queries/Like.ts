import { GraphQLNonNull, GraphQLString } from "graphql";
import { LikesType } from "../types/postType";
import { pool } from "../../database/mySqlConnect";
import { LikesBlogType } from "../types/blogType";

type ReturnType = {
  likes: string;
  comments_count: string;
  liked: boolean;
};

export const getLikes = {
  type: LikesType,
  args: {
    post_id: { type: new GraphQLNonNull(GraphQLString) },
    user_id: { type: new GraphQLNonNull(GraphQLString) },
  },
  async resolve(parent: any, args: { post_id: string; user_id: string }) {
    const likes: any = await pool.query(
      `SELECT * FROM likes WHERE post_id = '${args.post_id}'`
    );
    const comCount: any = await pool.query(
      `SELECT * FROM comments WHERE post_id ='${args.post_id}'`
    );

    const data: ReturnType = {
      likes: likes[0].length,
      comments_count: comCount[0].length,
      liked:
        likes[0].filter((item: any) => item.user_id === args.user_id).length > 0
          ? true
          : false,
    };
    if (!data) return;

    return data;
  },
};
export const getBlogLikes = {
  type: LikesBlogType,
  args: {
    blog_id: { type: new GraphQLNonNull(GraphQLString) },
    user_id: { type: new GraphQLNonNull(GraphQLString) },
  },
  async resolve(parent: any, args: { blog_id: string; user_id: string }) {
    const likes: any = await pool.query(
      `SELECT * FROM blogslikes WHERE blog_id = '${args.blog_id}'`
    );
    const comCount: any = await pool.query(
      `SELECT * FROM blogscomments WHERE blog_id ='${args.blog_id}'`
    );

    const data: ReturnType = {
      likes: likes[0].length,
      comments_count: comCount[0].length,
      liked:
        likes[0].filter((item: any) => item.user_id === args.user_id).length > 0
          ? true
          : false,
    };
    if (!data) return;

    return data;
  },
};
