import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BlogType } from "../components/SingleBlogs/Main";
import { BlogCommentType } from "../components/SingleBlogs/CommentsSection";

interface BlogStateType {
  blog: BlogType | null;
  comments: BlogCommentType[];
  likesData: {
    commentsCount: number;
    liked: boolean;
    likes: number;
  };
}

const initialState: BlogStateType = {
  blog: null,
  comments: [],
  likesData: {
    commentsCount: 0,
    liked: false,
    likes: 0,
  },
};

type LikesType = {
  commentsCount: number;
  liked: boolean;
  likes: number;
};

const BlogSlice = createSlice({
  name: "blogState",
  initialState,
  reducers: {
    addBlog: (state, action: PayloadAction<BlogType>) => {
      state.blog = action.payload;
    },
    addComments: (state, action: PayloadAction<BlogCommentType[]>) => {
      state.comments = action.payload;
    },
    addComment: (state, action: PayloadAction<BlogCommentType>) => {
      state.comments.push(action.payload);
      state.likesData.commentsCount += 1;
    },
    deleteComment: (state, action: PayloadAction<string>) => {
      state.comments = state.comments.filter(
        (item) => item.com_id !== action.payload
      );
      state.likesData.commentsCount -= 1;
    },
    addLikesData: (state, action: PayloadAction<LikesType>) => {
      state.likesData = action.payload;
    },
    addLike: (state) => {
      state.likesData.liked = true;
      state.likesData.likes += 1;
    },
    deleteLike: (state) => {
      state.likesData.liked = false;
      state.likesData.likes -= 1;
    },
  },
});

export const {
  addBlog,
  addComment,
  addComments,
  deleteComment,
  addLikesData,
  addLike,
  deleteLike,
} = BlogSlice.actions;

export default BlogSlice.reducer;
