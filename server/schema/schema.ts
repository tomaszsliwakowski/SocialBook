import { GraphQLObjectType, GraphQLSchema } from "graphql";
import { USER_ME } from "./queries/User";

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    USER_ME,
  },
});
const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {},
});

export const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
