import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Params} from "@angular/router";

import {urls} from "../../../constants";
import {IPaginated, IUser, IUserCreate} from "../../../share";


@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private httpClient: HttpClient) {
  }

  getAll(params: Params): Observable<IPaginated<IUser>> {
    return this.httpClient.get<IPaginated<IUser>>(urls.admin.user, {params});
  }

  createUser(user: IUserCreate): Observable<IUser> {
    return this.httpClient.post<IUser>(urls.admin.user, user);
  }

  getTokenUser(id: number): Observable<string> {
    return this.httpClient.get<string>(`${urls.admin.user}/${id}/re_token`);
  }
}
