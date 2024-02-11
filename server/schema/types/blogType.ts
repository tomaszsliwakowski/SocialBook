import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
} from "graphql";

export const PostType = new GraphQLObjectType({
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
const ParagraphType = new GraphQLObjectType({
  name: "ParagraphType",
  fields: () => ({
    id: { type: GraphQLID },
    paragraphType: { type: GraphQLString },
    content: { type: GraphQLString },
  }),
});
