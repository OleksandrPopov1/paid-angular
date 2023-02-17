import {IComment} from "./comment.interface";

export interface IGroup {
  id?: number;
  name: string;
}

export interface IManager {
  id: number;
  name: string;
  surname: string;
  user: number;
}

export interface IOrdersGeneral {
  name?: string;
  surname?: string;
  email?: string;
  phone?: string;
  age?: number;
  course?: string;
  course_format?: string;
  course_type?: string;
  sum?: number;
  alreadyPaid?: number;
  status?: string;
}

export interface IOrdersUpdate extends IOrdersGeneral {
  group?: number;
}

export interface IOrders extends IOrdersGeneral {
  id: number;
  manager: IManager;
  created_at: string | Date;
  utm: string;
  comments: IComment[];
  group: IGroup | undefined;
  msg: string
}
