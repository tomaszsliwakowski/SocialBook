import {
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLString,
} from "graphql";
import { BlogType, BlogsType } from "../types/blogType";
import { pool } from "../../database/mySqlConnect";

//API ONE BLOG

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

//API BLOGS WITH FILTERS

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
  userName?: string;
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

async function getStats(item: BlogType) {
  const queryLikes: any = await pool.query(
    `select count(*) as Likes from blogslikes where blog_id = '${item.id}'`
  );
  const queryCom: any = await pool.query(
    `select count(*) as Comments from blogscomments where blog_id = '${item.id}'`
  );
  const queryUser: any = await pool.query(
    `SELECT name from users WHERE id = '${item.user_id}'`
  );
  const likes: string = queryLikes[0][0] ? queryLikes[0][0].Likes : "0";
  const comments: string = queryCom[0][0] ? queryCom[0][0].Comments : "0";
  const userName: string = queryUser[0][0] ? queryUser[0][0].name : "";
  return {
    ...item,
    likes: likes,
    comments: comments,
    userName: userName,
  };
}

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
    const blogsAllData = selectedBlogs.map((item) =>
      getStats(item)
        .then((res) => {
          return res;
        })
        .catch(() => {
          console.log("Get likes and commetnts fail");
          return item;
        })
    );

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
    return blogs.filter((item) =>
      item.title.toLowerCase().includes(args.search.toLowerCase())
    );
  } else {
    return blogs.filter((item) => {
      const tags: Array<string> = JSON.parse(item.tags);
      const tagsToLowerCase = tags.map((item) => item.toLowerCase());
      return tagsToLowerCase.includes(args.search.toLowerCase());
    });
  }
};

//API POPULAR BLOGS

export const getPopularBlogs = {
  type: new GraphQLList(BlogsType),
  async resolve(parent: any, args: any) {
    const blogsData: any = await pool.query(
      `SELECT * FROM blogs WHERE (createdAt between now() - interval 365 day and now() )`
    );
    let blogs: BlogType[] | null = blogsData[0];
    if (!blogs) return;
    const blogsAllData = blogs.map((item) =>
      getStats(item)
        .then((res) => {
          return res;
        })
        .catch(() => {
          console.log("Get likes and commetnts fail");
          return item;
        })
    );
    let blogsSelected: BlogType[] = [];

    for (let index = 0; index < blogsAllData.length; index++) {
      const element = blogsAllData[index];
      await element.then((res) => {
        blogsSelected.push(res);
      });
    }

    return blogsSelected
      .sort(function (a, b) {
        return add(b.likes, b.comments) - add(a.likes, a.comments);
      })
      .splice(0, 9);
  },
};

function add(a: string | undefined, b: string | undefined) {
  if (!a || !b) return 0;
  return parseInt(a) + parseInt(b);
}
