"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = void 0;
const graphql_1 = require("graphql");
const User_1 = require("./queries/User");
const mutationsPosts_1 = require("./mutations/mutationsPosts");
const Posts_1 = require("./queries/Posts");
const Like_1 = require("./queries/Like");
const Comment_1 = require("./queries/Comment");
const mutationsUsers_1 = require("./mutations/mutationsUsers");
const mutationsBlogs_1 = require("./mutations/mutationsBlogs");
const Blog_1 = require("./queries/Blog");
const RootQuery = new graphql_1.GraphQLObjectType({
    name: "Query",
    fields: {
        getUser: User_1.getUser,
        getPosts: Posts_1.getPosts,
        getLikes: Like_1.getLikes,
        getComments: Comment_1.getPostComments,
        getBlog: Blog_1.getBlog,
        getUserInfo: User_1.getUserInfo,
        getBlogLikes: Like_1.getBlogLikes,
        getBlogComments: Comment_1.getBlogComments,
        getBlogs: Blog_1.getBlogs,
        getPopularBlogs: Blog_1.getPopularBlogs,
        getUserName: User_1.getUserName,
    },
});
const Mutation = new graphql_1.GraphQLObjectType({
    name: "Mutation",
    fields: {
        loginUser: mutationsUsers_1.loginUser,
        registerUser: mutationsUsers_1.registerUser,
        addPost: mutationsPosts_1.addPost,
        deletePost: mutationsPosts_1.deletePost,
        addLikePost: mutationsPosts_1.addLikePost,
        deleteLikePost: mutationsPosts_1.deleteLikePost,
        addCommentPost: mutationsPosts_1.addCommentPost,
        deleteCommentPost: mutationsPosts_1.deleteCommentPost,
        addFollow: mutationsPosts_1.addFollow,
        deleteFollow: mutationsPosts_1.deleteFollow,
        addBlog: mutationsBlogs_1.addBlog,
        addLikeBlog: mutationsBlogs_1.addLikeBlog,
        deleteLikeBlog: mutationsBlogs_1.deleteLikeBlog,
        deleteBlog: mutationsBlogs_1.deleteBlog,
        addBlogComment: mutationsBlogs_1.addBlogComment,
        deleteBlogComment: mutationsBlogs_1.deleteBlogComment,
    },
});
exports.schema = new graphql_1.GraphQLSchema({
    query: RootQuery,
    mutation: Mutation,
});
