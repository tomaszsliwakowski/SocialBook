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
exports.deleteBlogComment = exports.addBlogComment = exports.deleteLikeBlog = exports.addLikeBlog = exports.deleteBlog = exports.addBlog = void 0;
const graphql_1 = require("graphql");
const blogType_1 = require("../types/blogType");
const jsonwebtoken_1 = require("jsonwebtoken");
const assets_1 = require("../../assets/assets");
const mySqlConnect_1 = require("../../database/mySqlConnect");
exports.addBlog = {
    type: blogType_1.BlogType,
    args: {
        blogData: {
            type: new graphql_1.GraphQLNonNull(blogType_1.BlogArgType),
        },
    },
    resolve(parent, args, req) {
        return __awaiter(this, void 0, void 0, function* () {
            const cookie = req.cookies.IdUser;
            if (!cookie)
                return;
            const verifyUser = (0, jsonwebtoken_1.verify)(cookie, assets_1.AccessToken);
            if (!verifyUser)
                return;
            const arg = args.blogData;
            const res = yield mySqlConnect_1.pool
                .query(`INSERT INTO blogs VALUES ('${arg.id}','${arg.user_id}','${arg.title}','${arg.blogContent}','${arg.tags}','${arg.baner}','${arg.miniature}',NOW())`)
                .then(() => {
                return { id: arg.id };
            })
                .catch((res) => console.log(res));
            return res;
        });
    },
};
exports.deleteBlog = {
    type: blogType_1.BlogType,
    args: {
        blog_id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
    },
    resolve(parent, args, req) {
        return __awaiter(this, void 0, void 0, function* () {
            const cookie = req.cookies.IdUser;
            if (!cookie)
                return;
            const verifyUser = (0, jsonwebtoken_1.verify)(cookie, assets_1.AccessToken);
            if (!verifyUser)
                return;
            const res = yield mySqlConnect_1.pool
                .query(`DELETE FROM blogs WHERE id='${args.blog_id}'`)
                .then(() => {
                mySqlConnect_1.pool.query(`DELETE FROM blogscomments WHERE blog_id='${args.blog_id}'`);
                mySqlConnect_1.pool.query(`DELETE FROM blogslikes WHERE blog_id='${args.blog_id}'`);
                return args;
            })
                .catch((res) => console.log(res));
            if (!res || (res && !res.blog_id))
                return;
            return res;
        });
    },
};
exports.addLikeBlog = {
    type: blogType_1.LikeBlogType,
    args: {
        blog_id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        user_id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
    },
    resolve(parent, args, req) {
        return __awaiter(this, void 0, void 0, function* () {
            const cookie = req.cookies.IdUser;
            if (!cookie)
                return;
            const verifyUser = (0, jsonwebtoken_1.verify)(cookie, assets_1.AccessToken);
            if (!verifyUser)
                return;
            const res = yield mySqlConnect_1.pool
                .query(`INSERT INTO blogslikes VALUES ('${args.blog_id}','${args.user_id}')`)
                .then(() => {
                return args;
            })
                .catch((res) => console.log(res));
            if (!res || (res && !res.blog_id))
                return;
            return res;
        });
    },
};
exports.deleteLikeBlog = {
    type: blogType_1.LikeBlogType,
    args: {
        blog_id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        user_id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
    },
    resolve(parent, args, req) {
        return __awaiter(this, void 0, void 0, function* () {
            const cookie = req.cookies.IdUser;
            if (!cookie)
                return;
            const verifyUser = (0, jsonwebtoken_1.verify)(cookie, assets_1.AccessToken);
            if (!verifyUser)
                return;
            const res = yield mySqlConnect_1.pool
                .query(`DELETE FROM blogslikes WHERE (blog_id='${args.blog_id}' AND user_id='${args.user_id}')`)
                .then(() => {
                return args;
            })
                .catch((res) => console.log(res));
            if (!res || (res && !res.blog_id))
                return;
            return res;
        });
    },
};
exports.addBlogComment = {
    type: blogType_1.CommentBlogType,
    args: {
        blog_id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        user_id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        comment_text: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        com_id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
    },
    resolve(parent, args, req) {
        return __awaiter(this, void 0, void 0, function* () {
            const cookie = req.cookies.IdUser;
            if (!cookie)
                return;
            const verifyUser = (0, jsonwebtoken_1.verify)(cookie, assets_1.AccessToken);
            if (!verifyUser)
                return;
            const res = yield mySqlConnect_1.pool
                .query(`INSERT INTO blogscomments VALUES ('${args.blog_id}','${args.user_id}','${args.com_id}','${args.comment_text}',NOW())`)
                .then(() => {
                return args;
            })
                .catch((res) => console.log(res));
            if (!res || (res && !res.blog_id))
                return;
            return res;
        });
    },
};
exports.deleteBlogComment = {
    type: blogType_1.CommentBlogType,
    args: {
        blog_id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        user_id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        com_id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
    },
    resolve(parent, args, req) {
        return __awaiter(this, void 0, void 0, function* () {
            const cookie = req.cookies.IdUser;
            if (!cookie)
                return;
            const verifyUser = (0, jsonwebtoken_1.verify)(cookie, assets_1.AccessToken);
            if (!verifyUser)
                return;
            const res = yield mySqlConnect_1.pool
                .query(`DELETE FROM blogscomments WHERE (blog_id='${args.blog_id}' AND user_id='${args.user_id}' AND com_id='${args.com_id}')`)
                .then(() => {
                return args;
            })
                .catch((res) => console.log(res));
            if (!res || (res && !res.blog_id))
                return;
            return res;
        });
    },
};
