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
exports.getPosts = void 0;
const graphql_1 = require("graphql");
const postType_1 = require("../types/postType");
const mySqlConnect_1 = require("../../database/mySqlConnect");
exports.getPosts = {
    type: new graphql_1.GraphQLList(postType_1.PostType),
    args: {
        type: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        user_id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        count: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
    },
    resolve(parent, args) {
        return __awaiter(this, void 0, void 0, function* () {
            let PostsToSend = [];
            if (args.type === "all") {
                const Data = yield mySqlConnect_1.pool.query(`SELECT * FROM posts`);
                PostsToSend = Data[0];
            }
            if (args.type === "watched") {
                const observedData = yield mySqlConnect_1.pool.query(`SELECT * FROM followers WHERE user_id = '${args.user_id}'`);
                const observed = observedData[0];
                if (observed.length === 0) {
                    PostsToSend = [];
                }
                else {
                    const observedUser = observed.map((item) => item.followers_id);
                    let observed_idList = "";
                    for (let i = 0; i < observedUser.length; i++) {
                        const item = observedUser[i];
                        observed_idList += `'${item}'`;
                        if (i !== observedUser.length - 1) {
                            observed_idList += ", ";
                        }
                    }
                    const Data = yield mySqlConnect_1.pool.query(`SELECT * FROM posts WHERE user_id IN (${observed_idList})`);
                    PostsToSend = Data[0];
                }
            }
            if (args.type === "liked") {
                const likeData = yield mySqlConnect_1.pool.query(`SELECT * FROM likes WHERE user_id = '${args.user_id}'`);
                const liked = likeData[0];
                const LikedPosts = liked.map((item) => item.post_id);
                let post_idList = "";
                for (let i = 0; i < LikedPosts.length; i++) {
                    const item = LikedPosts[i];
                    post_idList += `'${item}'`;
                    if (i !== LikedPosts.length - 1) {
                        post_idList += ", ";
                    }
                }
                const Data = yield mySqlConnect_1.pool.query(`SELECT * FROM posts WHERE post_id IN (${post_idList})`);
                PostsToSend = Data[0];
            }
            if (args.type !== "all" &&
                args.type !== "liked" &&
                args.type !== "watched" &&
                args.type) {
                const postData = yield mySqlConnect_1.pool.query(`SELECT * FROM posts WHERE user_name = '${args.type}'`);
                if (postData[0].length > 0) {
                    PostsToSend = postData[0];
                }
                else {
                    const allPostData = yield mySqlConnect_1.pool.query(`SELECT * FROM posts`);
                    PostsToSend = allPostData[0].filter((it) => it.user_name.includes(args.type));
                }
            }
            return PostsToSend.slice(parseInt(args.count) * 10 - 10, parseInt(args.count) * 10);
        });
    },
};
