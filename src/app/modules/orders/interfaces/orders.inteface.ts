export interface IGroup {
  id?: number;
  name: string;
}

export interface IComment {
  id: number;
  comment: string;
  created_at: string;
}

export interface IManager {
  id: number;
  name: string;
  surname: string;
  user: string
}

export interface IOrdersUpdate {
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
  msg?: string;
  status?: string;
}

export interface IOrders extends IOrdersUpdate {
  id: number;
  // name: string;
  // surname: string;
  // email: string;
  // phone: string;
  // age: number;
  // course: string;
  // course_format: string;
  // course_type: string;
  // sum: number;
  // already_paid: number;
  // msg: string;
  // status: string;
  manager: IManager;
  created_at: string | Date;
  utm: string;
  comments: IComment[];
  group: IGroup;
}
