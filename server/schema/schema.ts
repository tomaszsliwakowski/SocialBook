import { GraphQLObjectType, GraphQLSchema } from "graphql";
import { USER_ME } from "./queries/User";
import { loginUser, registerUser } from "./mutations/mutations";

const RootQuery = new GraphQLObjectType({
  name: "Query",
  fields: {
    USER_ME: USER_ME,
  },
});
const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: { loginUser: loginUser, registerUser: registerUser },
});

export const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
