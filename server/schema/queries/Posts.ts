import { GraphQLList, GraphQLNonNull, GraphQLString } from "graphql";
import { PostType } from "../types/postType";
import { pool } from "../../database/mySqlConnect";

type PostPropsType = {
  type: string;
  user_id: string;
  count: string;
};

type likedType = {
  post_id: string;
  user_id: string;
};
type observedType = {
  post_id: string;
  followers_id: string;
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

export const getPosts = {
  type: new GraphQLList(PostType),
  args: {
    type: { type: new GraphQLNonNull(GraphQLString) },
    user_id: { type: new GraphQLNonNull(GraphQLString) },
    count: { type: new GraphQLNonNull(GraphQLString) },
  },
  async resolve(parent: any, args: PostPropsType) {
    let PostsToSend: any = [];
    if (args.type === "all") {
      const Data = await pool.query(`SELECT * FROM posts`);
      PostsToSend = Data[0];
    }
    if (args.type === "watched") {
      const observedData = await pool.query(
        `SELECT * FROM followers WHERE user_id = '${args.user_id}'`
      );
      const observed: any = observedData[0];
      if (observed.length === 0) {
        PostsToSend = [];
      } else {
        const observedUser: string[] = observed.map(
          (item: observedType) => item.followers_id
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

    return PostsToSend.slice(
      parseInt(args.count) * 10 - 10,
      parseInt(args.count) * 10
    );
  },
};
