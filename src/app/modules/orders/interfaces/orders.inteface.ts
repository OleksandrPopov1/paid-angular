export interface IGroup {
  id: number;
  name: string;
}

export interface IComments {
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

export interface IOrders {
  id: number;
  name: string;
  surname: string;
  email: string;
  phone: string;
  age: number;
  course: string;
  course_format: string;
  course_type: string;
  sum: number;
  already_paid: number;
  msg: string;
  status: string;
  manager: IManager;
  created_at: string | Date;
  utm: string;
  comment: IComments;
  group: IGroup;
}
