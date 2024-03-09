import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInputObjectType,
  GraphQLBoolean,
} from "graphql";

export const BlogType = new GraphQLObjectType({
  name: "Blog",
  fields: () => ({
    id: { type: GraphQLID },
    user_id: { type: GraphQLID },
    title: { type: GraphQLString },
    blogContent: { type: GraphQLString },
    tags: { type: GraphQLString },
    miniature: { type: GraphQLString },
    baner: { type: GraphQLString },
    createdAt: { type: GraphQLString },
  }),
});
export const BlogsType = new GraphQLObjectType({
  name: "Blogs",
  fields: () => ({
    id: { type: GraphQLID },
    user_id: { type: GraphQLID },
    title: { type: GraphQLString },
    blogContent: { type: GraphQLString },
    tags: { type: GraphQLString },
    miniature: { type: GraphQLString },
    baner: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    likes: { type: GraphQLString },
    comments: { type: GraphQLString },
  }),
});

export const BlogArgType = new GraphQLInputObjectType({
  name: "BlogArgType",
  fields: {
    id: { type: GraphQLID },
    user_id: { type: GraphQLID },
    title: { type: GraphQLString },
    blogContent: { type: GraphQLString },
    tags: { type: GraphQLString },
    miniature: { type: GraphQLString },
    baner: { type: GraphQLString },
  },
});
export const LikeBlogType = new GraphQLObjectType({
  name: "BlogLike",
  fields: () => ({
    blog_id: { type: GraphQLID },
    user_id: { type: GraphQLID },
  }),
});
export const LikesBlogType = new GraphQLObjectType({
  name: "BlogsLikes",
  fields: () => ({
    likes: { type: GraphQLString },
    comments_count: { type: GraphQLString },
    liked: { type: GraphQLBoolean },
  }),
});

export const CommentBlogType = new GraphQLObjectType({
  name: "BlogComment",
  fields: () => ({
    blog_id: { type: GraphQLID },
    user_id: { type: GraphQLID },
    createdAt: { type: GraphQLString },
    comment_text: { type: GraphQLString },
    com_id: { type: GraphQLString },
    name: { type: GraphQLString },
  }),
});
