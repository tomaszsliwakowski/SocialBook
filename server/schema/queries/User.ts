import { GraphQLID, GraphQLList } from "graphql";
import { UserType } from "../types/userType";

export const USER_ME = {
  type: new GraphQLList(UserType),
  args: { id: { type: GraphQLID } },
  resolve(parent: any, args: { id: string }) {
    return args.id;
  },
};
