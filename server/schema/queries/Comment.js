"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBlogComments = exports.getPostComments = void 0;
const graphql_1 = require("graphql");
const postType_1 = require("../types/postType");
const mySqlConnect_1 = require("../../database/mySqlConnect");
const blogType_1 = require("../types/blogType");
exports.getPostComments = {
    type: new graphql_1.GraphQLList(postType_1.CommentType),
    args: {
        post_id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
    },
    resolve(parent, args) {
        return __awaiter(this, void 0, void 0, function* () {
            const comments = yield mySqlConnect_1.pool.query(`SELECT * FROM comments WHERE post_id = '${args.post_id}'`);
            if (!comments[0])
                return;
            return comments[0];
        });
    },
};
exports.getBlogComments = {
    type: new graphql_1.GraphQLList(blogType_1.CommentBlogType),
    args: {
        blog_id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
    },
    resolve(parent, args) {
        return __awaiter(this, void 0, void 0, function* () {
            const comments = yield mySqlConnect_1.pool.query(`SELECT blogscomments.blog_id , blogscomments.user_id,blogscomments.com_id,blogscomments.comment_text,blogscomments.createdAt,users.name FROM socialbookdb.blogscomments ,socialbookdb.users WHERE (blog_id = '${args.blog_id}' AND socialbookdb.users.id = socialbookdb.blogscomments.user_id);`);
            if (!comments[0])
                return;
            return comments[0];
        });
    },
};
