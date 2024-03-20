"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentBlogType = exports.LikesBlogType = exports.LikeBlogType = exports.BlogArgType = exports.BlogsType = exports.BlogType = void 0;
const graphql_1 = require("graphql");
exports.BlogType = new graphql_1.GraphQLObjectType({
    name: "Blog",
    fields: () => ({
        id: { type: graphql_1.GraphQLID },
        user_id: { type: graphql_1.GraphQLID },
        title: { type: graphql_1.GraphQLString },
        blogContent: { type: graphql_1.GraphQLString },
        tags: { type: graphql_1.GraphQLString },
        miniature: { type: graphql_1.GraphQLString },
        baner: { type: graphql_1.GraphQLString },
        createdAt: { type: graphql_1.GraphQLString },
    }),
});
exports.BlogsType = new graphql_1.GraphQLObjectType({
    name: "Blogs",
    fields: () => ({
        id: { type: graphql_1.GraphQLID },
        user_id: { type: graphql_1.GraphQLID },
        title: { type: graphql_1.GraphQLString },
        blogContent: { type: graphql_1.GraphQLString },
        tags: { type: graphql_1.GraphQLString },
        miniature: { type: graphql_1.GraphQLString },
        baner: { type: graphql_1.GraphQLString },
        createdAt: { type: graphql_1.GraphQLString },
        likes: { type: graphql_1.GraphQLString },
        comments: { type: graphql_1.GraphQLString },
        userName: { type: graphql_1.GraphQLString },
    }),
});
exports.BlogArgType = new graphql_1.GraphQLInputObjectType({
    name: "BlogArgType",
    fields: {
        id: { type: graphql_1.GraphQLID },
        user_id: { type: graphql_1.GraphQLID },
        title: { type: graphql_1.GraphQLString },
        blogContent: { type: graphql_1.GraphQLString },
        tags: { type: graphql_1.GraphQLString },
        miniature: { type: graphql_1.GraphQLString },
        baner: { type: graphql_1.GraphQLString },
    },
});
exports.LikeBlogType = new graphql_1.GraphQLObjectType({
    name: "BlogLike",
    fields: () => ({
        blog_id: { type: graphql_1.GraphQLID },
        user_id: { type: graphql_1.GraphQLID },
    }),
});
exports.LikesBlogType = new graphql_1.GraphQLObjectType({
    name: "BlogsLikes",
    fields: () => ({
        likes: { type: graphql_1.GraphQLString },
        comments_count: { type: graphql_1.GraphQLString },
        liked: { type: graphql_1.GraphQLBoolean },
    }),
});
exports.CommentBlogType = new graphql_1.GraphQLObjectType({
    name: "BlogComment",
    fields: () => ({
        blog_id: { type: graphql_1.GraphQLID },
        user_id: { type: graphql_1.GraphQLID },
        createdAt: { type: graphql_1.GraphQLString },
        comment_text: { type: graphql_1.GraphQLString },
        com_id: { type: graphql_1.GraphQLString },
        name: { type: graphql_1.GraphQLString },
    }),
});
