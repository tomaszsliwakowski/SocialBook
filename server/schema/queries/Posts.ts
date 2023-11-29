import { GraphQLList } from "graphql";
import { PostType } from "../types/postType";
import { pool } from "../../database/mySqlConnect";

export interface POST_TYPE {
  id: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
  data: string;
  content: {
    text: string;
    image: string;
  };
  like: string[];
  comments: string;
}

export const GET_POSTS = {
  type: new GraphQLList(PostType),
  async resolve(parent: any, args: any) {
    const basePosts: any = await pool.query(`SELECT * FROM posts`);
    const doneData = basePosts[0].map((item: any) => {
      const userPost: any = pool.query(
        `SELECT * FROM users WHERE id='${item.user_id}'`
      );
      const [id, name, email] = userPost;
      const likePost: any = pool.query(
        `SELECT * FROM likes WHERE (post_id='${item.post_id}' AND user_id='${item.user_id}' )`
      );
      const commentsPost: any = pool.query(
        `SELECT * FROM comments WHERE (post_id='${item.post_id}' AND user_id='${item.user_id}' )`
      );
      return {
        post_id: item.post_id,
        user: {
          id: id,
          name: name,
          email: email,
        },
        data: item.createdAt,
        content: { text: item.post_text, image: item.post_img },
        likes: likePost,
        comments: commentsPost,
      };
    });
    console.log(doneData);
  },
};
export const GET_POST = {
  type: PostType,
  async resolve(parent: any, args: any) {},
};
