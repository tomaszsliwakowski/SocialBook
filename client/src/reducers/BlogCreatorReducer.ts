import { Reducer } from "react";

interface ParagraphType {
  id: string;
  paragraphType: string;
}

export interface TextParagrafType extends ParagraphType {
  content: string;
}
export interface TextAndImageParagraphType extends TextParagrafType {
  image: string;
}
export interface ImageParagraphType extends ParagraphType {
  image_0: string;
  image_1?: string;
  image_2?: string;
  image_4?: string;
}

export interface CreatorReducerType {
  title: string;
  blogContent: Array<
    TextParagrafType | TextAndImageParagraphType | ImageParagraphType
  >;
  tags: Array<string>;
  miniature: string;
  baner: string;
}

export enum ActionType {
  CHANGE_TITLE = "change-title",
  ADD_BLOGCONTENT = "add-blogContent",
  DELETE_BLOGCONTENT = "delete-blogContent",
  MODIFY_BLOGCONTENT = "modify-blogContent",
  INDEX_BLOGCONTENT = "index-blogContent",
  ADD_TAG = "add-tags",
  DELETE_TAG = "delete-tag",
  CHANGE_MINIATURE = "change-miniature",
  CHANGE_BANER = "change-baner",
  CLEAR_STATE = "clear-state",
}

export interface Action {
  type: ActionType;
  payload: any;
}

export const initialState: CreatorReducerType = {
  title: "",
  blogContent: [],
  tags: [],
  miniature: "",
  baner: "",
};

export const CreatorReducer: Reducer<CreatorReducerType, Action> = (
  state: CreatorReducerType,
  action: Action
): CreatorReducerType => {
  const { type, payload } = action;
  switch (type) {
    //title
    case ActionType.CHANGE_TITLE: {
      return { ...state, title: payload };
    }
    //blogContent
    case ActionType.ADD_BLOGCONTENT: {
      return { ...state, blogContent: [...state.blogContent, payload] };
    }
    case ActionType.DELETE_BLOGCONTENT: {
      return {
        ...state,
        blogContent: state.blogContent.filter((item) => item.id !== payload),
      };
    }
    case ActionType.MODIFY_BLOGCONTENT: {
      const index = state.blogContent.findIndex(payload.id);
      return {
        ...state,
        blogContent: state.blogContent.splice(index, 1, payload.paragraph),
      };
    }
    case ActionType.INDEX_BLOGCONTENT: {
      const fromIndex = state.blogContent.indexOf(payload.id);
      const toIndex = payload.action === "up" ? fromIndex + 1 : fromIndex - 1;
      if (toIndex < 0 || toIndex > 3) return state;
      const element = state.blogContent.splice(fromIndex, 1)[0];
      return {
        ...state,
        blogContent: state.blogContent.splice(toIndex, 0, element),
      };
    }
    //tags
    case ActionType.ADD_TAG: {
      if (typeof payload !== "string") return state;
      return { ...state, tags: [...state.tags, payload] };
    }
    case ActionType.DELETE_TAG: {
      return { ...state, tags: state.tags.filter((item) => item !== payload) };
    }
    //miniature
    case ActionType.CHANGE_MINIATURE: {
      return { ...state, miniature: payload };
    }
    //baner
    case ActionType.CHANGE_BANER: {
      return { ...state, baner: payload };
    }
    //clear
    case ActionType.CLEAR_STATE: {
      return initialState;
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
};
