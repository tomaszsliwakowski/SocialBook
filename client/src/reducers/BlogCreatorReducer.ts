import { Reducer, ReducerAction, ReducerState } from "react";

export interface CreatorReducerType {
  title: string;
  blogContent: {};
  tags: Array<string>;
  miniature: "";
  baner: "";
}

enum ActionType {
  add_title = "add-title",
  add_blogContent = "add-blogContent",
  add_tags = "add-tags",
  add_miniature = "add-miniature",
  add_baner = "add-baner",
}

interface Action {
  type: ActionType;
  payload: any;
}

export const reducer: Reducer<CreatorReducerType, Action> = (
  state: CreatorReducerType,
  action: Action
): CreatorReducerType => {
  const { type, payload } = action;
  switch (type) {
    case ActionType.add_title: {
      let newData = state;
      newData.title = payload;
      return newData;
    }
    case ActionType.add_blogContent: {
      return state;
    }
    case ActionType.add_tags: {
      let newData = state;
      if (typeof payload !== "string") return state;
      newData.tags.push(payload);
      return newData;
    }
    case ActionType.add_miniature: {
      return state;
    }
    case ActionType.add_baner: {
      return state;
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
};
