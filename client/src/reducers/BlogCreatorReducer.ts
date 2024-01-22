import { Reducer } from "react";

export interface CreatorReducerType {
  title: string;
  blogContent: {};
  tags: Array<string>;
  miniature: "";
  baner: "";
}

export enum ActionType {
  change_title = "change-title",
  add_blogContent = "add-blogContent",
  add_tags = "add-tags",
  add_miniature = "add-miniature",
  add_baner = "add-baner",
  delete_tag = "delete-tag",
  clear_state = "clear-state",
}

export interface Action {
  type: ActionType;
  payload: any;
}

export const initialState: CreatorReducerType = {
  title: "",
  blogContent: {},
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
    case ActionType.change_title: {
      return { ...state, title: payload };
    }
    //blogContent
    case ActionType.add_blogContent: {
      return state;
    }
    //tags
    case ActionType.add_tags: {
      if (typeof payload !== "string") return state;
      return { ...state, tags: [...state.tags, payload] };
    }
    case ActionType.delete_tag: {
      return { ...state, tags: state.tags.filter((item) => item !== payload) };
    }
    //miniature
    case ActionType.add_miniature: {
      return state;
    }
    //baner
    case ActionType.add_baner: {
      return state;
    }
    //clear
    case ActionType.clear_state: {
      return initialState;
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
};
