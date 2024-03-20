"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FollowerType = exports.LikesType = exports.LikeType = exports.CommentType = exports.AddPostType = exports.PostType = void 0;
const graphql_1 = require("graphql");
exports.PostType = new graphql_1.GraphQLObjectType({
    name: "Post",
    fields: () => ({
        post_id: { type: graphql_1.GraphQLID },
        user_id: { type: graphql_1.GraphQLID },
        createdAt: { type: graphql_1.GraphQLString },
        post_text: { type: graphql_1.GraphQLString },
        post_img: { type: graphql_1.GraphQLString },
        user_name: { type: graphql_1.GraphQLString },
        user_email: { type: graphql_1.GraphQLString },
    }),
});
exports.AddPostType = new graphql_1.GraphQLObjectType({
    name: "AddPost",
    fields: () => ({
        post_id: { type: graphql_1.GraphQLID },
        user_id: { type: graphql_1.GraphQLID },
        post_text: { type: graphql_1.GraphQLString },
        post_img: { type: graphql_1.GraphQLString },
        user_name: { type: graphql_1.GraphQLString },
        user_email: { type: graphql_1.GraphQLString },
    }),
});
exports.CommentType = new graphql_1.GraphQLObjectType({
    name: "Comment",
    fields: () => ({
        post_id: { type: graphql_1.GraphQLID },
        user_id: { type: graphql_1.GraphQLID },
        createdAt: { type: graphql_1.GraphQLString },
        comment_text: { type: graphql_1.GraphQLString },
        username: { type: graphql_1.GraphQLString },
        com_id: { type: graphql_1.GraphQLString },
    }),
});
exports.LikeType = new graphql_1.GraphQLObjectType({
    name: "Like",
    fields: () => ({
        post_id: { type: graphql_1.GraphQLID },
        user_id: { type: graphql_1.GraphQLID },
    }),
});
exports.LikesType = new graphql_1.GraphQLObjectType({
    name: "Likes",
    fields: () => ({
        likes: { type: graphql_1.GraphQLString },
        comments_count: { type: graphql_1.GraphQLString },
        liked: { type: graphql_1.GraphQLBoolean },
    }),
});
exports.FollowerType = new graphql_1.GraphQLObjectType({
    name: "Follower",
    fields: () => ({
        user_id: { type: graphql_1.GraphQLID },
        follower_id: { type: graphql_1.GraphQLID },
    }),
});
