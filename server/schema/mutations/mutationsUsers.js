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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = exports.loginUser = void 0;
const graphql_1 = require("graphql");
const userType_1 = require("../types/userType");
const bcrypt_1 = __importDefault(require("bcrypt"));
const mySqlConnect_1 = require("../../database/mySqlConnect");
const crypto_1 = __importDefault(require("crypto"));
const jsonwebtoken_1 = require("jsonwebtoken");
const assets_1 = require("../../assets/assets");
exports.loginUser = {
    type: userType_1.UserType,
    args: {
        email: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        password: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
    },
    resolve(parent, args, { res }) {
        return __awaiter(this, void 0, void 0, function* () {
            const [rows] = yield mySqlConnect_1.pool.query(`SELECT * FROM users WHERE email = '${args.email}'`);
            const user = rows[0];
            if (!user) {
                throw new Error("User does not exist");
            }
            const valid = yield bcrypt_1.default.compare(args.password, user.password);
            if (!valid) {
                throw new Error("Wrong password");
            }
            const Token = (0, jsonwebtoken_1.sign)({ userId: user.id }, assets_1.AccessToken, {
                expiresIn: "7d",
            });
            res.cookie("IdUser", Token, {
                sameSite: "none",
                secure: true,
            });
            return {
                id: user.id,
                name: user.name,
                email: user.email,
            };
        });
    },
};
exports.registerUser = {
    type: userType_1.UserType,
    args: {
        name: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        email: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        password: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
    },
    resolve(parent, args) {
        return __awaiter(this, void 0, void 0, function* () {
            const hashedPassword = yield bcrypt_1.default.hash(args.password, 10);
            const id = crypto_1.default.randomBytes(10).toString("hex");
            yield mySqlConnect_1.pool.query(`INSERT INTO users VALUES ('${id}','${args.name}','${args.email}','${hashedPassword}')`);
            return { id: id };
        });
    },
};
