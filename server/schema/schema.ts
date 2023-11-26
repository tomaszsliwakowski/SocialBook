import { GraphQLObjectType, GraphQLSchema } from "graphql";
import { USER_ME } from "./queries/User";
import {
  addCommentPost,
  addLikePost,
  addPost,
  deleteCommentPost,
  deleteLikePost,
  deletePost,
  loginUser,
  registerUser,
} from "./mutations/mutations";

const RootQuery = new GraphQLObjectType({
  name: "Query",
  fields: {
    GetUser: USER_ME,
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
  },
});

export const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
