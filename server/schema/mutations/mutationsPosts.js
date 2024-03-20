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
exports.deleteFollow = exports.addFollow = exports.deleteCommentPost = exports.addCommentPost = exports.deleteLikePost = exports.addLikePost = exports.deletePost = exports.addPost = void 0;
const graphql_1 = require("graphql");
const mySqlConnect_1 = require("../../database/mySqlConnect");
const jsonwebtoken_1 = require("jsonwebtoken");
const assets_1 = require("../../assets/assets");
const postType_1 = require("../types/postType");
exports.addPost = {
    type: postType_1.AddPostType,
    args: {
        post_id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        user_id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        post_text: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        post_img: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        user_name: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        user_email: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
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
                .query(`INSERT INTO posts VALUES ('${args.post_id}','${args.user_id}',NOW(),'${args.post_text}','${args.post_img}','${args.user_name}','${args.user_email}')`)
                .then(() => {
                return args;
            })
                .catch((res) => console.log(res));
            return res;
        });
    },
};
exports.deletePost = {
    type: postType_1.PostType,
    args: {
        post_id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
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
                .query(`DELETE FROM posts WHERE post_id='${args.post_id}'`)
                .then(() => {
                mySqlConnect_1.pool.query(`DELETE FROM comments WHERE post_id='${args.post_id}'`);
                mySqlConnect_1.pool.query(`DELETE FROM likes WHERE post_id='${args.post_id}'`);
                return args;
            })
                .catch((res) => console.log(res));
            if (!res || (res && !res.post_id))
                return;
            return res;
        });
    },
};
exports.addLikePost = {
    type: postType_1.LikeType,
    args: {
        post_id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
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
                .query(`INSERT INTO likes VALUES ('${args.post_id}','${args.user_id}')`)
                .then(() => {
                return args;
            })
                .catch((res) => console.log(res));
            if (!res || (res && !res.post_id))
                return;
            return res;
        });
    },
};
exports.deleteLikePost = {
    type: postType_1.LikeType,
    args: {
        post_id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
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
                .query(`DELETE FROM likes WHERE (post_id='${args.post_id}' AND user_id='${args.user_id}')`)
                .then(() => {
                return args;
            })
                .catch((res) => console.log(res));
            if (!res || (res && !res.post_id))
                return;
            return res;
        });
    },
};
exports.addCommentPost = {
    type: postType_1.CommentType,
    args: {
        post_id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        user_id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        comment_text: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        username: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
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
                .query(`INSERT INTO comments VALUES ('${args.post_id}','${args.user_id}',NOW(),'${args.comment_text}','${args.username}','${args.com_id}')`)
                .then(() => {
                return args;
            })
                .catch((res) => console.log(res));
            if (!res || (res && !res.post_id))
                return;
            return res;
        });
    },
};
exports.deleteCommentPost = {
    type: postType_1.CommentType,
    args: {
        post_id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
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
                .query(`DELETE FROM comments WHERE (post_id='${args.post_id}' AND user_id='${args.user_id}' AND com_id='${args.com_id}')`)
                .then(() => {
                return args;
            })
                .catch((res) => console.log(res));
            if (!res || (res && !res.post_id))
                return;
            return res;
        });
    },
};
exports.addFollow = {
    type: postType_1.FollowerType,
    args: {
        user_id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        follower_id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
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
                .query(`INSERT INTO followers VALUES ('${args.user_id}','${args.follower_id}')`)
                .then(() => {
                return args;
            })
                .catch((res) => console.log(res));
            if (!res || (res && !res.user_id))
                return;
            return res;
        });
    },
};
exports.deleteFollow = {
    type: postType_1.FollowerType,
    args: {
        user_id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        follower_id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
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
                .query(`DELETE FROM followers WHERE (user_id='${args.user_id}' AND followers_id='${args.follower_id}')`)
                .then(() => {
                return args;
            })
                .catch((res) => console.log(res));
            if (!res || (res && !res.user_id))
                return;
            return res;
        });
    },
};
