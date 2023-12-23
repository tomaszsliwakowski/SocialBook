import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLBoolean,
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

export const AddPostType = new GraphQLObjectType({
  name: "AddPost",
  fields: () => ({
    post_id: { type: GraphQLID },
    user_id: { type: GraphQLID },
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
    username: { type: GraphQLString },
    com_id: { type: GraphQLString },
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
    likes: { type: GraphQLString },
    comments_count: { type: GraphQLString },
    liked: { type: GraphQLBoolean },
  }),
});

export const FollowerType = new GraphQLObjectType({
  name: "Follower",
  fields: () => ({
    user_id: { type: GraphQLID },
    follower_id: { type: GraphQLID },
  }),
});
