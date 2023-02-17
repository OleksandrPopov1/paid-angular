export interface IProfile {
  id?: number
  name: string;
  surname: string;
  user?: number;
}

export interface IUserCreate {
  email: string;
  profile: IProfile;
}

export interface IUser extends IUserCreate {
  create_at: string;
  id: number;
  is_active: boolean;
  is_superuser: boolean;
  last_login: string;
  update_at: string;
  is_staff: boolean;
}
