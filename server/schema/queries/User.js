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
exports.getUserName = exports.getUserInfo = exports.getUser = void 0;
const userType_1 = require("../types/userType");
const mySqlConnect_1 = require("../../database/mySqlConnect");
const jsonwebtoken_1 = require("jsonwebtoken");
const assets_1 = require("../../assets/assets");
const graphql_1 = require("graphql");
exports.getUser = {
    type: userType_1.UserType,
    resolve(parent, args, req) {
        return __awaiter(this, void 0, void 0, function* () {
            const cookie = req.cookies.IdUser;
            console.log(cookie);
            if (!cookie)
                return { name: "", email: "" };
            const data = (0, jsonwebtoken_1.verify)(cookie, assets_1.AccessToken);
            if (!data)
                return { name: "", email: "" };
            const [rows] = yield mySqlConnect_1.pool.query(`SELECT * FROM users WHERE id = '${data.userId}'`);
            const followersData = yield mySqlConnect_1.pool.query(`SELECT * FROM followers WHERE user_id = '${data.userId}'`);
            const observedData = yield mySqlConnect_1.pool.query(`SELECT * FROM followers WHERE followers_id = '${data.userId}'`);
            const followers = followersData[0];
            const observed = observedData[0];
            const { id, name, email } = rows[0];
            return {
                id: id,
                name: name,
                email: email,
                followers: followers,
                observed: observed,
            };
        });
    },
};
exports.getUserInfo = {
    type: userType_1.UserType,
    resolve(parent, args, req) {
        return __awaiter(this, void 0, void 0, function* () {
            const cookie = req.cookies.IdUser;
            if (!cookie)
                return { name: "", email: "" };
            const data = (0, jsonwebtoken_1.verify)(cookie, assets_1.AccessToken);
            if (!data)
                return { name: "", email: "" };
            const [rows] = yield mySqlConnect_1.pool.query(`SELECT * FROM users WHERE id = '${data.userId}'`);
            const { id, name, email } = rows[0];
            return {
                id: id,
                name: name,
                email: email,
            };
        });
    },
};
exports.getUserName = {
    type: userType_1.UserType,
    args: {
        id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
    },
    resolve(parent, args, req) {
        return __awaiter(this, void 0, void 0, function* () {
            const cookie = req.cookies.IdUser;
            if (!cookie)
                return { name: "", email: "" };
            const data = (0, jsonwebtoken_1.verify)(cookie, assets_1.AccessToken);
            if (!data)
                return { name: "", email: "" };
            const [rows] = yield mySqlConnect_1.pool.query(`SELECT id,name FROM users WHERE id = '${args.id}'`);
            const { id, name } = rows[0];
            return {
                id: id,
                name: name,
            };
        });
    },
};
