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
exports.getBlogLikes = exports.getLikes = void 0;
const graphql_1 = require("graphql");
const postType_1 = require("../types/postType");
const mySqlConnect_1 = require("../../database/mySqlConnect");
const blogType_1 = require("../types/blogType");
exports.getLikes = {
    type: postType_1.LikesType,
    args: {
        post_id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        user_id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
    },
    resolve(parent, args) {
        return __awaiter(this, void 0, void 0, function* () {
            const likes = yield mySqlConnect_1.pool.query(`SELECT * FROM likes WHERE post_id = '${args.post_id}'`);
            const comCount = yield mySqlConnect_1.pool.query(`SELECT * FROM comments WHERE post_id ='${args.post_id}'`);
            const data = {
                likes: likes[0].length,
                comments_count: comCount[0].length,
                liked: likes[0].filter((item) => item.user_id === args.user_id).length > 0
                    ? true
                    : false,
            };
            if (!data)
                return;
            return data;
        });
    },
};
exports.getBlogLikes = {
    type: blogType_1.LikesBlogType,
    args: {
        blog_id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        user_id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
    },
    resolve(parent, args) {
        return __awaiter(this, void 0, void 0, function* () {
            const likes = yield mySqlConnect_1.pool.query(`SELECT * FROM blogslikes WHERE blog_id = '${args.blog_id}'`);
            const comCount = yield mySqlConnect_1.pool.query(`SELECT * FROM blogscomments WHERE blog_id ='${args.blog_id}'`);
            const data = {
                likes: likes[0].length,
                comments_count: comCount[0].length,
                liked: likes[0].filter((item) => item.user_id === args.user_id).length > 0
                    ? true
                    : false,
            };
            if (!data)
                return;
            return data;
        });
    },
};
