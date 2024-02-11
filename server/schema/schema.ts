import { GraphQLObjectType, GraphQLSchema } from "graphql";
import { USER_ME } from "./queries/User";
import {
  addCommentPost,
  addFollow,
  addLikePost,
  addPost,
  deleteCommentPost,
  deleteFollow,
  deleteLikePost,
  deletePost,
} from "./mutations/mutationsPosts";
import { GET_POSTS } from "./queries/Posts";
import { GET_Likes } from "./queries/Like";
import { GET_Comments } from "./queries/Comment";
import { loginUser, registerUser } from "./mutations/mutationsUsers";

const RootQuery = new GraphQLObjectType({
  name: "Query",
  fields: {
    GetUser: USER_ME,
    GetPosts: GET_POSTS,
    GetLikes: GET_Likes,
    GetComments: GET_Comments,
  },
});
const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    loginUser: loginUser,
    registerUser: registerUser,
    addPost: addPost,
    deletePost: deletePost,
    addLikePost: addLikePost,
    deleteLikePost: deleteLikePost,
    addCommentPost: addCommentPost,
    deleteCommentPost: deleteCommentPost,
    addFollow: addFollow,
    deleteFollow: deleteFollow,
  },
});

export const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
