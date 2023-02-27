import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {Params} from "@angular/router";

import {urls} from "../../../constants";
import {IPaginated, IUser, IUserCreate} from "../../../share";
import {IStatistic} from "../intarfaces";


@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private _currentUser = new BehaviorSubject<IUser>(null);

  constructor(private httpClient: HttpClient) {
  }

  getAllUsers(params: Params): Observable<IPaginated<IUser>> {
    return this.httpClient.get<IPaginated<IUser>>(urls.admin.user, {params});
  }

  createUser(user: IUserCreate): Observable<IUser> {
    return this.httpClient.post<IUser>(urls.admin.user, user);
  }

  getTokenUser(id: number): Observable<string> {
    return this.httpClient.get<string>(`${urls.admin.user}/${id}/re_token`);
  }

  getStatisticAllOrders(): Observable<IStatistic> {
    return this.httpClient.get<IStatistic>(`${urls.admin.statistic}/orders`);
  }

  getStatisticManagerById(id: number): Observable<IStatistic> {
    return this.httpClient.get<IStatistic>(`${urls.admin.statistic}/users/${id}`);
  }

  banUser(id: number): Observable<ArrayBuffer> {
    return this.httpClient.patch<ArrayBuffer>(`${urls.admin.user}/${id}/ban`, id);
  }

  unbanUser(id: number): Observable<ArrayBuffer> {
    return this.httpClient.patch<ArrayBuffer>(`${urls.admin.user}/${id}/unban`, id);
  }

  setCurrentUser(newUser: IUser): void {
    this._currentUser.next(newUser);
  }

  getCurrentUser(): Observable<IUser> {
    return this._currentUser.asObservable();
  }
}
