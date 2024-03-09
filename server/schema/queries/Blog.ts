import {
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLString,
} from "graphql";
import { BlogType, BlogsType } from "../types/blogType";
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
  page: number;
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
  likes?: string;
  comments?: string;
};

const MySqlGetBlogQuery = async (args: GetBlogsArgType) => {
  if (args.type === "Watched") {
    return `SELECT * FROM blogs WHERE ${
      args.timeSpan !== "All"
        ? `(createdAt between now() - interval ${args.timeSpan} day and now() ) AND`
        : ""
    } (user_id IN (select followers_id from followers where user_id = '${
      args.userId
    }'))
    `;
  } else {
    if (args.timeSpan === "All") {
      return `SELECT * FROM blogs`;
    } else {
      return `SELECT * FROM blogs WHERE (createdAt between now() - interval ${args.timeSpan} day and now() )
      `;
    }
  }
};

export const getBlogs = {
  type: new GraphQLList(BlogsType),
  args: {
    type: { type: new GraphQLNonNull(GraphQLString) },
    search: { type: new GraphQLNonNull(GraphQLString) },
    searchType: { type: new GraphQLNonNull(GraphQLString) },
    tag: { type: new GraphQLNonNull(GraphQLString) },
    timeSpan: { type: new GraphQLNonNull(GraphQLString) },
    page: { type: new GraphQLNonNull(GraphQLInt) },
    userId: { type: new GraphQLNonNull(GraphQLString) },
  },
  async resolve(parent: any, args: GetBlogsArgType) {
    const query = await MySqlGetBlogQuery(args);
    const blogsData: any = await pool.query(query);
    let blogs: BlogType[] | null = blogsData[0];
    if (!blogs) return;
    blogs = await filterHandler(blogs, args);
    if (!blogs) return;
    const selectedBlogs = blogs.splice(args.page, args.page + 10);
    const blogsAllData = selectedBlogs.map(async (item) => {
      const queryLikes: any = await pool.query(
        `SELECT COUNT(socialbookdb.blogslikes.blog_id) OVER(partition by socialbookdb.blogslikes.user_id) as Likes FROM socialbookdb.blogslikes WHERE (socialbookdb.blogslikes.blog_id = '${item.id}') `
      );
      const queryCom: any = await pool.query(
        `SELECT COUNT(socialbookdb.blogscomments.blog_id) OVER(partition by socialbookdb.blogscomments.user_id) as Comments FROM socialbookdb.blogscomments WHERE  (socialbookdb.blogscomments.blog_id = '${item.id}')`
      );
      const Likes: string = queryLikes[0][0] ? queryLikes[0][0].Likes : "0";
      const Comments: string = queryCom[0][0] ? queryCom[0][0].Comments : "0";
      return { ...item, likes: Likes, comments: Comments };
    });

    return blogsAllData;
  },
};

const filterHandler = async (blogs: BlogType[], args: GetBlogsArgType) => {
  if (blogs.length === 0) return null;
  return filterTag(blogs, args);
};

const filterTag = (blogs: BlogType[], args: GetBlogsArgType) => {
  if (args.tag === "All") {
    return filterSearch(blogs, args);
  } else {
    const blogsFilter = blogs.filter((item) => {
      const tags: Array<string> = JSON.parse(item.tags);
      const tagsToLowerCase = tags.map((item) => item.toLowerCase());
      return tagsToLowerCase.includes(args.tag.toLowerCase());
    });
    return filterSearch(blogsFilter, args);
  }
};

const filterSearch = (blogs: BlogType[], args: GetBlogsArgType): BlogType[] => {
  if (args.search === "") return blogs;

  if (args.searchType === "title") {
    return blogs.filter((item) => item.title.includes(args.search));
  } else {
    return blogs.filter((item) => {
      const tags: Array<string> = JSON.parse(item.tags);
      const tagsToLowerCase = tags.map((item) => item.toLowerCase());
      return tagsToLowerCase.includes(args.search.toLowerCase());
    });
  }
};
