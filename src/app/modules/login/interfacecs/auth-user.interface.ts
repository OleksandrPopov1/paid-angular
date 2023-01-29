export interface IProfile {
  name: string;
  surname: string;
}

export interface IAuthUser {
  create_at: string;
  email: string
  id: number;
  is_active: boolean;
  is_superuser: boolean;
  last_login: string;
  profile: IProfile;
  update_at: string;
}
