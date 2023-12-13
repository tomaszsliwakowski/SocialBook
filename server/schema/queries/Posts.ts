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
type observedType = {
  post_id: string;
  observed_id: string;
};

type PostsDataType = {
  post_id: string;
  user_id: string;
  createdAt: string;
  post_text: string;
  post_img: string;
  user_name: string;
  user_email: string;
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
      const Data = await pool.query(`SELECT * FROM posts`);
      PostsToSend = Data[0];
    }
    if (args.type === "watched") {
      const observedData = await pool.query(
        `SELECT * FROM observed WHERE user_id = '${args.user_id}'`
      );
      const observed: any = observedData[0];
      const observedUser: string[] = observed.map(
        (item: observedType) => item.observed_id
      );
      let observed_idList = "";
      for (let i = 0; i < observedUser.length; i++) {
        const item = observedUser[i];
        observed_idList += `'${item}'`;
        if (i !== observedUser.length - 1) {
          observed_idList += ", ";
        }
      }
      const Data = await pool.query(
        `SELECT * FROM posts WHERE user_id IN (${observed_idList})`
      );
      PostsToSend = Data[0];
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
      const Data = await pool.query(
        `SELECT * FROM posts WHERE post_id IN (${post_idList})`
      );
      PostsToSend = Data[0];
    }
    if (
      args.type !== "all" &&
      args.type !== "liked" &&
      args.type !== "watched" &&
      args.type
    ) {
      const postData: any = await pool.query(
        `SELECT * FROM posts WHERE user_name = '${args.type}'`
      );
      if (postData[0].length > 0) {
        PostsToSend = postData[0];
      } else {
        const allPostData: any = await pool.query(`SELECT * FROM posts`);
        PostsToSend = allPostData[0].filter((it: PostsDataType) =>
          it.user_name.includes(args.type)
        );
      }
    }

    return PostsToSend.slice(0, 11);
  },
};

export const GET_POST = {
  type: PostType,
  async resolve(parent: any, args: any) {},
};
