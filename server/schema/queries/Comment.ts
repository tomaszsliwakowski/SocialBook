import { GraphQLList, GraphQLNonNull, GraphQLString } from "graphql";
import { CommentType } from "../types/postType";
import { pool } from "../../database/mySqlConnect";
import { CommentBlogType } from "../types/blogType";

export const getPostComments = {
  type: new GraphQLList(CommentType),
  args: {
    post_id: { type: new GraphQLNonNull(GraphQLString) },
  },
  async resolve(parent: any, args: { post_id: string }) {
    const comments: any = await pool.query(
      `SELECT * FROM comments WHERE post_id = '${args.post_id}'`
    );
    if (!comments[0]) return;
    return comments[0];
  },
};

export const getBlogComments = {
  type: new GraphQLList(CommentBlogType),
  args: {
    blog_id: { type: new GraphQLNonNull(GraphQLString) },
  },
  async resolve(parent: any, args: { blog_id: string }) {
    const comments: any = await pool.query(
      `SELECT blogscomments.blog_id , blogscomments.user_id,blogscomments.com_id,blogscomments.comment_text,blogscomments.createdAt,users.name FROM socialbookdb.blogscomments ,socialbookdb.users WHERE (blog_id = '${args.blog_id}' AND socialbookdb.users.id = socialbookdb.blogscomments.user_id);`
    );
    if (!comments[0]) return;
    return comments[0];
  },
};
