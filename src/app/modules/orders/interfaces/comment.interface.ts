import {IProfile} from "../../../share";

export interface IComment {
  id?: number;
  comment: string;
  created_at?: string;
  order_id?: number;
  manager: IProfile;
}
