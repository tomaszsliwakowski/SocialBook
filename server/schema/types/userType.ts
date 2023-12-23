import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
} from "graphql";

const FollowerObjectType = new GraphQLObjectType({
  name: "FollowersType",
  fields: () => ({
    user_id: { type: GraphQLString },
    followers_id: { type: GraphQLString },
  }),
});

export const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    followers: { type: new GraphQLList(FollowerObjectType) },
    observed: { type: new GraphQLList(FollowerObjectType) },
  }),
});
