import { GraphQLList } from "graphql";
import { UserType } from "../types/userType";

export const USER_ME = {
  type: new GraphQLList(UserType),
  resolve() {
    return {};
  },
};
