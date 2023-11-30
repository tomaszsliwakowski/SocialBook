import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
} from "graphql";

export const PostType = new GraphQLObjectType({
  name: "Post",
  fields: () => ({
    post_id: { type: GraphQLID },
    user_id: { type: GraphQLID },
    createdAt: { type: GraphQLString },
    post_text: { type: GraphQLString },
    post_img: { type: GraphQLString },
    user_name: { type: GraphQLString },
    user_email: { type: GraphQLString },
  }),
});

export const CommentType = new GraphQLObjectType({
  name: "Comment",
  fields: () => ({
    post_id: { type: GraphQLID },
    user_id: { type: GraphQLID },
    createdAt: { type: GraphQLString },
    comment_text: { type: GraphQLString },
  }),
});

export const LikeType = new GraphQLObjectType({
  name: "Like",
  fields: () => ({
    post_id: { type: GraphQLID },
    user_id: { type: GraphQLID },
  }),
});
export const LikesType = new GraphQLObjectType({
  name: "Likes",
  fields: () => ({
    likes: { type: new GraphQLList(LikeType) },
    comments_count: { type: GraphQLString },
  }),
});
