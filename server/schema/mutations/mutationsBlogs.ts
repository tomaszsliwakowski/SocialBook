import { GraphQLInputObjectType, GraphQLNonNull } from "graphql";
import { BlogArgType, BlogType } from "../types/blogType";

export type CreatorDataType = {
  id: string;
  user_id: string;
  title: string;
  blogContent: (
    | {
        id: string;
        type: string;
        content: string | undefined;
        images: string[];
      }
    | {
        id: string;
        type: string;
        images: string[];
      }
    | {
        id: string;
        type: string;
        content: string | undefined;
      }
  )[];
  tags: string[];
  baner: string;
  miniature: string;
};

export const addBlog = {
  type: BlogType,
  args: {
    blogData: {
      type: new GraphQLNonNull(BlogArgType),
    },
  },
  async resolve(parent: any, args: { blogData: CreatorDataType }) {
    console.log(args.blogData);
    return args.blogData;
  },
};
