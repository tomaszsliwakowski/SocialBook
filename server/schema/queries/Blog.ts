import { GraphQLList, GraphQLNonNull, GraphQLString } from "graphql";
import { BlogType } from "../types/blogType";
import { pool } from "../../database/mySqlConnect";

export const getBlog = {
  type: BlogType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLString) },
  },
  async resolve(parent: any, args: { id: string }) {
    const [rows]: any = await pool.query(
      `SELECT * FROM blogs WHERE id = '${args.id}'`
    );
    return rows[0];
  },
};

type GetBlogsArgType = {
  type: string;
  search: string;
  searchType: string;
  tag: string;
  sorting: string;
  timeSpan: string;
  page: string;
  userId: string;
};

type BlogType = {
  id: string;
  user_id: string;
  title: string;
  blogContent: string;
  tags: string;
  baner: string;
  miniature: string;
  createdAt: string;
};

export const getBlogs = {
  type: new GraphQLList(BlogType),
  args: {
    type: { type: new GraphQLNonNull(GraphQLString) },
    search: { type: new GraphQLNonNull(GraphQLString) },
    searchType: { type: new GraphQLNonNull(GraphQLString) },
    tag: { type: new GraphQLNonNull(GraphQLString) },
    sorting: { type: new GraphQLNonNull(GraphQLString) },
    timeSpan: { type: new GraphQLNonNull(GraphQLString) },
    page: { type: new GraphQLNonNull(GraphQLString) },
    userId: { type: new GraphQLNonNull(GraphQLString) },
  },
  async resolve(parent: any, args: GetBlogsArgType) {
    let blogsToSend = [];
    if (args.type === "Watched") {
      const blogsData: any = await pool.query(
        `SELECT * FROM blogs WHERE user_id IN (select followers_id from followers where user_id = '${args.userId}')`
      );
      //add get like
      let blogs: BlogType[] | null = blogsData[0];
      if (!blogs) return;
      blogs = filterHandler(blogs, args);
      console.log(blogs);
      return blogsData[0];
      //
    } else if (args.type === "For You") {
      //
    }

    //  const [rows]: any = await pool.query(
    //   `SELECT * FROM blogs WHERE id = '${args.id}'`
    // );
    // return rows[0];
  },
};

const filterHandler = (
  blogs: BlogType[],
  args: GetBlogsArgType
): BlogType[] | null => {
  if (blogs.length === 0) return null;
  return filterTag(blogs, args);
};

const filterTag = (blogs: BlogType[], args: GetBlogsArgType): BlogType[] => {
  if (args.tag === "All") {
    return blogs;
  } else {
    return blogs.filter((item) => JSON.parse(item.tags).includes(args.tag));
  }
};
