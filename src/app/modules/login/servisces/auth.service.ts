import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable, tap} from "rxjs";

import {IAuth, ITokens} from "../interfacecs";
import {urls} from "../../../constants";
import {IUser} from "../../../share";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly _accessTokenKey = 'access';
  private readonly _refreshTokenKey = 'refresh';
  private readonly _userRoleKey = 'role';

  private _authUser = new BehaviorSubject<IUser | null>(null);

  constructor(private httpClient: HttpClient) {
  }

  login(user: IAuth): Observable<ITokens> {
    return this.httpClient.post<ITokens>(urls.auth.login, user).pipe(
      tap(value => {
        this._setTokens(value);
        this.setAuthUser();
      })
    )
  }

  refresh(refresh: string): Observable<ITokens> {
    return this.httpClient.post<ITokens>(urls.auth.refresh, {refresh}).pipe(
      tap(value => {
        this._setTokens(value);
      })
    )
  }

  activate(password: string, token: string): Observable<string> {
    return this.httpClient.post<string>(`${urls.auth.activate}/${token}`, {password});
  }

  private _setTokens(tokens: ITokens): void {
    localStorage.setItem(this._accessTokenKey, tokens.access);
    localStorage.setItem(this._refreshTokenKey, tokens.refresh);
  }

  getAccessToken(): string {
    return localStorage.getItem(this._accessTokenKey) || '';
  }

  getRefreshToken(): string {
    return localStorage.getItem(this._refreshTokenKey) || '';
  }

  deleteTokens(): void {
    localStorage.removeItem(this._accessTokenKey);
    localStorage.removeItem(this._refreshTokenKey);
  }

  isAuthenticated(): boolean {
    return !!this.getAccessToken();
  }

  setAuthUser(): void {
    this.httpClient.get<IUser>(urls.user.myUser).subscribe(user => {
      this._authUser.next(user);
      this._setRole(user.is_superuser);
    });
  }

  getUser(): Observable<IUser | null> {
    return this._authUser.asObservable();
  }

  private _setRole(isAdmin: boolean): void {
    const role: string = isAdmin ? 'Admin' : 'User';
    localStorage.setItem(this._userRoleKey, role);
  }

  getRole(): string {
    return localStorage.getItem(this._userRoleKey) || '';
  }

  deleteRole(): void {
    localStorage.removeItem(this._userRoleKey);
  }

}
