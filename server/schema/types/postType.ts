import { GraphQLObjectType, GraphQLID, GraphQLString } from "graphql";

export const PostType = new GraphQLObjectType({
  name: "Post",
  fields: () => ({
    post_id: { type: GraphQLID },
    user_id: { type: GraphQLID },
    createdAt: { type: GraphQLString },
    post_text: { type: GraphQLString },
    post_img: { type: GraphQLString },
  }),
});

export const CommentsType = new GraphQLObjectType({
  name: "Comments",
  fields: () => ({
    post_id: { type: GraphQLID },
    user_id: { type: GraphQLID },
    createdAt: { type: GraphQLString },
    comment_text: { type: GraphQLString },
  }),
});

export const LikesType = new GraphQLObjectType({
  name: "Likes",
  fields: () => ({
    post_id: { type: GraphQLID },
    user_id: { type: GraphQLID },
  }),
});
