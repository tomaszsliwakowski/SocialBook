import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLInputObjectType,
} from "graphql";

export const BlogType = new GraphQLObjectType({
  name: "Blog",
  fields: () => ({
    id: { type: GraphQLID },
    user_id: { type: GraphQLID },
    title: { type: GraphQLString },
    blogContent: { type: new GraphQLList(ParagraphType) },
    tags: { type: new GraphQLList(GraphQLString) },
    miniature: { type: GraphQLString },
    baner: { type: GraphQLString },
  }),
});

export const ParagraphType = new GraphQLObjectType({
  name: "ParagraphType",
  fields: () => ({
    id: { type: GraphQLID },
    type: { type: GraphQLString },
    content: { type: GraphQLString },
    images: { type: new GraphQLList(GraphQLString) },
  }),
});

export const ArgsParagraphType = new GraphQLInputObjectType({
  name: "ArgsParagraphType",
  fields: () => ({
    id: { type: GraphQLID },
    type: { type: GraphQLString },
    content: { type: GraphQLString },
    images: { type: new GraphQLList(GraphQLString) },
  }),
});
export const BlogArgType = new GraphQLInputObjectType({
  name: "BlogArgTyp",
  fields: {
    id: { type: GraphQLID },
    user_id: { type: GraphQLID },
    title: { type: GraphQLString },
    blogContent: { type: new GraphQLList(ArgsParagraphType) },
    tags: { type: new GraphQLList(GraphQLString) },
    miniature: { type: GraphQLString },
    baner: { type: GraphQLString },
  },
});
