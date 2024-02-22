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
  name: "Like",
  fields: () => ({
    post_id: { type: GraphQLID },
    user_id: { type: GraphQLID },
  }),
});
export const LikesBlogType = new GraphQLObjectType({
  name: "Likes",
  fields: () => ({
    likes: { type: GraphQLString },
    comments_count: { type: GraphQLString },
    liked: { type: GraphQLBoolean },
  }),
});
