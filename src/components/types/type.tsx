export type Inputs = {
  email: string;
  password: string;
};
export type InputsReg = {
  email: string;
  password: string;
  username: string;
};
export type BtnSortType = {
  new: boolean;
  like: boolean;
};
export type InputsForm = {
  title: string;
  description: string;
};

export type File = {
  name: string;
  size: number;
  type: string;
};
export type propsType = {
  closepanel: Function;
  postrender: Function;
};
export type UserType = {
  email: string;
  id: string;
  password: string;
  userID: string;
  username: string;
};
export type PostType = {
  id: string;
  postID: string;
  title: string;
  desc: string;
  img: string;
  date: string;
  datetime: number;
  like: Array<string>;
  com: Array<ComType>;
  user: string;
};

export type propsPost = {
  searchPost: string;
  BtnSortPost: BtnSortType;
  postRedner: string;
};

export type ComType = {
  user: string;
  date: string;
  datetime: number;
  comment: string;
};
export type optPost = {
  id: string;
  show: boolean;
};
export type ParamsID = {
  postID: string;
};
