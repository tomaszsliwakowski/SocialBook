import { GraphQLList, GraphQLNonNull, GraphQLString } from "graphql";
import { PostType } from "../types/postType";
import { pool } from "../../database/mySqlConnect";

type PostPropsType = {
  type: string;
  user_id: string;
};

type likedType = {
  post_id: string;
  user_id: string;
};

export const GET_POSTS = {
  type: new GraphQLList(PostType),
  args: {
    type: { type: new GraphQLNonNull(GraphQLString) },
    user_id: { type: new GraphQLNonNull(GraphQLString) },
  },
  async resolve(parent: any, args: PostPropsType) {
    let PostsToSend: any = [];
    if (args.type === "all") {
      PostsToSend = await pool.query(`SELECT * FROM posts`);
    }
    if (args.type === "watched") {
      PostsToSend = await pool.query(`SELECT * FROM posts`);
    }
    if (args.type === "liked") {
      const likeData = await pool.query(
        `SELECT * FROM likes WHERE user_id = '${args.user_id}'`
      );
      const liked: any = likeData[0];
      const LikedPosts: string[] = liked.map((item: likedType) => item.post_id);
      let post_idList = "";
      for (let i = 0; i < LikedPosts.length; i++) {
        const item = LikedPosts[i];
        post_idList += `'${item}'`;
        if (i !== LikedPosts.length - 1) {
          post_idList += ", ";
        }
      }
      PostsToSend = await pool.query(
        `SELECT * FROM posts WHERE post_id IN (${post_idList})`
      );
    }
    return PostsToSend[0].slice(0, 11);
  },
};

export const GET_POST = {
  type: PostType,
  async resolve(parent: any, args: any) {},
};
