"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserType = void 0;
const graphql_1 = require("graphql");
const FollowerObjectType = new graphql_1.GraphQLObjectType({
    name: "FollowersType",
    fields: () => ({
        user_id: { type: graphql_1.GraphQLString },
        followers_id: { type: graphql_1.GraphQLString },
    }),
});
exports.UserType = new graphql_1.GraphQLObjectType({
    name: "User",
    fields: () => ({
        id: { type: graphql_1.GraphQLID },
        name: { type: graphql_1.GraphQLString },
        email: { type: graphql_1.GraphQLString },
        password: { type: graphql_1.GraphQLString },
        followers: { type: new graphql_1.GraphQLList(FollowerObjectType) },
        observed: { type: new graphql_1.GraphQLList(FollowerObjectType) },
    }),
});
