import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInputObjectType,
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
