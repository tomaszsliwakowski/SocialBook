import { Reducer } from "react";

export interface CreatorReducerType {
  title: string;
  blogContent: {};
  tags: Array<string>;
  miniature: "";
  baner: "";
}

export enum ActionType {
  add_title = "add-title",
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
    //titel
    case ActionType.add_title: {
      let newData = state;
      newData.title = payload;
      return newData;
    }
    //blogContent
    case ActionType.add_blogContent: {
      return state;
    }
    //tags
    case ActionType.add_tags: {
      let newData = state;
      if (typeof payload !== "string") return state;
      newData.tags.push(payload);
      return newData;
    }
    case ActionType.delete_tag: {
      let newData = state;
      let index = newData.tags.indexOf(payload);
      newData.tags.splice(index, 1);
      return newData;
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
