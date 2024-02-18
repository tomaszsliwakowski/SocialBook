import { GraphQLObjectType, GraphQLSchema } from "graphql";
import { getUser, getUserInfo } from "./queries/User";
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
import { getPosts } from "./queries/Posts";
import { getLikes } from "./queries/Like";
import { getComments } from "./queries/Comment";
import { loginUser, registerUser } from "./mutations/mutationsUsers";
import { addBlog } from "./mutations/mutationsBlogs";
import { getBlog } from "./queries/Blog";

const RootQuery = new GraphQLObjectType({
  name: "Query",
  fields: {
    getUser: getUser,
    getPosts: getPosts,
    getLikes: getLikes,
    getComments: getComments,
    getBlog: getBlog,
    getUserInfo: getUserInfo,
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
    addBlog: addBlog,
  },
});

export const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
